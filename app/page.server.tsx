import { ApolloClient, gql, NormalizedCacheObject } from "@apollo/client";
import { GetServerSideProps } from "next";
import { Block, HorizontalStackBlockType, Layout } from "../graphql/types";
import ContentBlock from "../ui/blocks/ContentBlock.server";
import HeroBlock from "../ui/blocks/HeroBlock.server";
import HorizontalStackBlock from "../ui/blocks/HorizontalStackBlock.server";
import createGSSPApolloClient from "../utils/create-gssp-apollo-client";

const LAYOUT_QUERY = gql`
  query LayoutQuery($page: String!) {
    layout(page: $page) {
      id
      page
      blocks {
        ... on HeroBlock {
          id
          color
        }
        ... on ContentBlock {
          id
          content
        }
        ... on HorizontalStackBlock {
          id
        }
      }
    }
  }
`;

type LayoutQueryResult = {
  layout: Layout | null;
};

const HORIZONTAL_STACK_BLOCK_QUERY = gql`
  query HorizontalStackBlockQuery($id: ID!) {
    horizontalStackBlock(id: $id) {
      id
      blocks {
        ... on HeroBlock {
          id
          color
        }
        ... on ContentBlock {
          id
          content
        }
        ... on HorizontalStackBlock {
          id
        }
      }
    }
  }
`;

type HorizontalStackBlockQueryResult = {
  horizontalStackBlock: HorizontalStackBlockType | null;
};

async function resolveHorizontalStackBlockBlocks({
  id,
  client,
}: {
  id: string;
  client: ApolloClient<NormalizedCacheObject>;
}): Promise<Block[]> {
  const result = await client.query<HorizontalStackBlockQueryResult>({
    query: HORIZONTAL_STACK_BLOCK_QUERY,
    variables: {
      id,
    },
  });

  return result.data.horizontalStackBlock
    ? await Promise.all(
        result.data.horizontalStackBlock.blocks.map(async (block) =>
          block.__typename === "HorizontalStackBlock"
            ? {
                ...block,
                blocks: await resolveHorizontalStackBlockBlocks({
                  id: block.id,
                  client,
                }),
              }
            : block
        )
      )
    : [];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createGSSPApolloClient();

  const result = await client.query<LayoutQueryResult>({
    query: LAYOUT_QUERY,
    variables: {
      page: "home",
    },
  });

  const blocks = await Promise.all(
    result.data.layout!.blocks.map(async (block) =>
      block.__typename === "HorizontalStackBlock"
        ? {
            ...block,
            blocks: await resolveHorizontalStackBlockBlocks({
              id: block.id,
              client,
            }),
          }
        : block
    )
  );

  return { props: { blocks } };
};

type Props = {
  blocks: Block[];
};

export default function HomePage({ blocks }: Props) {
  return blocks.map((block) => (
    <div key={block.id} style={{ marginBottom: "1rem" }}>
      {(() => {
        switch (block.__typename) {
          case "HeroBlock":
            return <HeroBlock color={block.color} />;
          case "ContentBlock":
            return <ContentBlock content={block.content} />;
          case "HorizontalStackBlock":
            return <HorizontalStackBlock blocks={block.blocks} />;
        }
      })()}
    </div>
  ));
}
