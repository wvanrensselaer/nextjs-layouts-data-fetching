import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { Category } from "../graphql/types";
import Header from "../ui/Header.client";
import createGSSPApolloClient from "../utils/create-gssp-apollo-client";

const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      id
      name
      slug
    }
  }
`;

type CategoriesQueryResult = {
  categories: Category[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createGSSPApolloClient();

  const result = await client.query<CategoriesQueryResult>({
    query: CATEGORIES_QUERY,
  });

  return {
    props: {
      categories: result.data.categories,
    },
  };
};

type Props = {
  categories: Category[];
  children: JSX.Element;
};

export default function RootLayout({ categories, children }: Props) {
  return (
    <html>
      <head>
        <title>Next.js Layouts Test</title>
      </head>
      <body>
        <div style={{ width: "800px", margin: "auto" }}>
          <Header categories={categories} />
          <div style={{ marginTop: "1rem" }}>{children}</div>
        </div>
      </body>
    </html>
  );
}
