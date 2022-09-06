import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { Product } from "../../../graphql/types";
import ProductView from "../../../ui/ProductView.client";
import createGSSPApolloClient from "../../../utils/create-gssp-apollo-client";

const PRODUCT_QUERY = gql`
  query ProductQuery($id: ID!, $optionID: ID) {
    product(id: $id, optionID: $optionID) {
      id
      name
      price
      options {
        id
        name
      }
    }
  }
`;

type ProductQueryResult = {
  product: Product | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = createGSSPApolloClient();
  // @ts-ignore
  const productID = context.params.id;
  // @ts-ignore
  const selectedOptionID = context.searchParams.option;

  const result = await client.query<ProductQueryResult>({
    query: PRODUCT_QUERY,
    variables: {
      id: productID,
      optionID: selectedOptionID,
    },
  });

  return {
    props: {
      product: result.data.product,
    },
  };
};

type Props = {
  product: Product;
};

export default function ProductPage({ product }: Props) {
  return <ProductView product={product} />;
}
