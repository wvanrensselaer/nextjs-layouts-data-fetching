import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { Filter } from "../../../graphql/types";
import Column from "../../../ui/design/Column";
import Grid from "../../../ui/design/Grid";
import Filters from "../../../ui/Filters.client";
import createGSSPApolloClient from "../../../utils/create-gssp-apollo-client";

const FILTERS_QUERY = gql`
  query FiltersQuery {
    filters {
      id
      name
    }
  }
`;

type FiltersQueryResult = {
  filters: Filter[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = createGSSPApolloClient();

  const result = await client.query<FiltersQueryResult>({
    query: FILTERS_QUERY,
  });

  return {
    props: {
      filters: result.data.filters,
    },
  };
};

type Props = {
  filters: Filter[];
  children: JSX.Element;
};

export default function CategoryLayout({ filters, children }: Props) {
  return (
    <Grid>
      <Column size={3}>
        <Filters filters={filters} />
      </Column>
      <Column size={9}>{children}</Column>
    </Grid>
  );
}
