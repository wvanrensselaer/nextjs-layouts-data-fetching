export type Category = {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
  products: Product[];
};

export type Product = {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  options: ProductOption[];
};

export type ProductOption = {
  __typename: "ProductOption";
  id: string;
  name: string;
};

export type Filter = {
  __typename: "Filter";
  id: string;
  name: string;
};

export type HeroBlock = {
  __typename: "HeroBlock";
  id: string;
  color: string;
};

export type ContentBlock = {
  __typename: "ContentBlock";
  id: string;
  content: string;
};

export type HorizontalStackBlock = {
  __typename: "HorizontalStackBlock";
  id: string;
  blocks: Block[];
};

export type Block = HeroBlock | ContentBlock | HorizontalStackBlock;

export type Layout = {
  __typename: "Layout";
  id: string;
  page: string;
  blocks: Block[];
};
