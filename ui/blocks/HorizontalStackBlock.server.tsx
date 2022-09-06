import { Block } from "../../graphql/types";
import Column from "../design/Column";
import Grid from "../design/Grid";
import ContentBlock from "./ContentBlock.server";
import HeroBlock from "./HeroBlock.server";

type Props = {
  blocks: Block[];
};

export default function HorizontalStackBlock({ blocks }: Props) {
  return (
    <Grid>
      {blocks.map((block) => (
        <Column key={block.id} size="auto">
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
        </Column>
      ))}
    </Grid>
  );
}
