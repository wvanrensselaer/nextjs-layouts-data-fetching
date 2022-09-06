import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { Category } from "../../../graphql/types";
import CategoryView from "../../../ui/CategoryView.client";
import createGSSPApolloClient from "../../../utils/create-gssp-apollo-client";

const CATEGORY_QUERY = gql`
  query CategoryQuery($slug: String!, $filter: String) {
    category(slug: $slug) {
      id
      name
      slug
      products(filter: $filter) {
        id
        name
        price
        options {
          id
          name
        }
      }
    }
  }
`;

type CategoryQueryResult = {
  category: Category | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createGSSPApolloClient();
  // @ts-ignore
  const selectedFilter = context.searchParams.filter;

  const result = await client.query<CategoryQueryResult>({
    query: CATEGORY_QUERY,
    variables: {
      slug: context.params!.slug,
      filter: selectedFilter,
    },
  });

  return {
    props: {
      category: result.data.category,
    },
  };
};

type Props = {
  category: Category;
};

export default function CategoryPage({ category }: Props) {
  return <CategoryView category={category} />;
}
