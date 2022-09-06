import { gql } from "apollo-server-micro";
import database, { HorizontalStackBlockModel } from "./database";

export const typeDefs = gql`
  interface Node {
    id: ID!
  }

  type Category implements Node {
    id: ID!
    name: String!
    slug: String!
    products(filter: String): [Product!]!
  }

  type ProductOption implements Node {
    id: ID!
    name: String!
  }

  type Product implements Node {
    id: ID!
    name: String!
    price: Int!
    options: [ProductOption!]!
  }

  type Filter implements Node {
    id: ID!
    name: String!
  }

  type HeroBlock implements Node {
    id: ID!
    color: String!
  }

  type ContentBlock implements Node {
    id: ID!
    content: String!
  }

  type HorizontalStackBlock implements Node {
    id: ID!
    blocks: [Block!]!
  }

  union Block = HeroBlock | ContentBlock | HorizontalStackBlock

  type Layout implements Node {
    id: ID!
    page: String!
    blocks: [Block!]!
  }

  type Query {
    node(id: ID!): Node

    categories: [Category!]!

    category(slug: String!): Category

    product(id: ID!, optionID: ID): Product

    filters: [Filter!]!

    layout(page: String!): Layout

    horizontalStackBlock(id: ID!): HorizontalStackBlock
  }
`;

export const resolvers = {
  Node: {
    __resolveType(node) {
      return node.__typename || null;
    },
  },
  Category: {
    products(category, args) {
      const products = database.products.asArray.filter(
        (product) => product.categoryID === category.id
      );

      return args.filter
        ? products
            .filter((product) => {
              const options = database.productOptions.asArray.filter(
                (option) => option.productID === product.id
              );

              return options.some(
                (option) =>
                  option.name.toLowerCase() === args.filter.toLowerCase()
              );
            })
            .map((product) => {
              const options = database.productOptions.asArray.filter(
                (option) => option.productID === product.id
              );
              const selectedOption = options.find(
                (option) =>
                  option.name.toLowerCase() === args.filter.toLowerCase()
              )!;

              return {
                ...product,
                price: product.price + selectedOption.priceModifier,
              };
            })
        : products;
    },
  },
  Product: {
    options(product) {
      return database.productOptions.asArray.filter(
        (productOption) => productOption.productID === product.id
      );
    },
  },
  Block: {
    __resolveType(node) {
      return node.__typename;
    },
  },
  HorizontalStackBlock: {
    blocks(horizontalStackBlock) {
      return (
        database.blocks.byID[
          horizontalStackBlock.id
        ] as HorizontalStackBlockModel
      ).blockIDs.map((id) => database.blocks.byID[id]);
    },
  },
  Layout: {
    blocks(layout) {
      return layout.blockIDs.map((id) => database.blocks.byID[id]);
    },
  },
  Query: {
    node(root, args) {
      return database.nodes.get(args.id);
    },
    categories() {
      return database.categories.asArray;
    },
    category(root, args) {
      return (
        database.categories.asArray.find(
          (category) => category.slug === args.slug
        ) || null
      );
    },
    product(root, args) {
      const product = database.products.byID[args.id];
      const option = args.optionID
        ? database.productOptions.byID[args.optionID]
        : null;

      return option
        ? {
            ...product,
            price: product.price + option.priceModifier,
          }
        : product;
    },
    filters() {
      return database.filters.asArray;
    },
    layout(root, args) {
      return (
        database.layouts.asArray.find((layout) => layout.page === args.page) ||
        null
      );
    },
    horizontalStackBlock(root, args) {
      return database.blocks.byID[args.id];
    },
  },
};
