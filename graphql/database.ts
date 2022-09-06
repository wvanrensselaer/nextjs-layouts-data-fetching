let id = 0;

function createID(): string {
  return `${id++}`;
}

interface Node {
  id: string;
}

const nodes = new Map<string, Record<string, unknown>>();

function createNode(node) {
  nodes.set(node.id, node);

  return node;
}

export type CategoryModel = {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
};

function createCategory({
  name,
  slug,
}: {
  name: string;
  slug: string;
}): CategoryModel {
  return createNode({
    __typename: "Category",
    id: createID(),
    name,
    slug,
  });
}

export type ProductModel = {
  __typename: "Product";
  id: string;
  name: string;
  price: number;
  categoryID: string;
};

function createProduct({
  name,
  price,
  categoryID,
}: {
  name: string;
  price: number;
  categoryID: string;
}): ProductModel {
  return createNode({
    __typename: "Product",
    id: createID(),
    name,
    price,
    categoryID,
  });
}

export type ProductOptionModel = {
  __typename: "ProductOption";
  id: string;
  name: string;
  priceModifier: number;
  productID: string;
};

function createProductOption({
  name,
  priceModifier,
  productID,
}: {
  name: string;
  priceModifier: number;
  productID: string;
}): ProductOptionModel {
  return createNode({
    __typename: "ProductOption",
    id: createID(),
    name,
    priceModifier,
    productID,
  });
}

export type FilterModel = {
  __typename: "Filter";
  id: string;
  name: string;
};

function createFilter({ name }: { name: string }): FilterModel {
  return createNode({
    __typename: "Filter",
    id: createID(),
    name,
  });
}

export type HeroBlockModel = {
  __typename: "HeroBlock";
  id: string;
  color: string;
};

function createHeroBlock({ color }: { color: string }): HeroBlockModel {
  return createNode({
    __typename: "HeroBlock",
    id: createID(),
    color,
  });
}

export type ContentBlockModel = {
  __typename: "ContentBlock";
  id: string;
  content: string;
};

function createContentBlock({
  content,
}: {
  content: string;
}): ContentBlockModel {
  return createNode({
    __typename: "ContentBlock",
    id: createID(),
    content,
  });
}

export type HorizontalStackBlockModel = {
  __typename: "HorizontalStackBlock";
  id: string;
  blockIDs: string[];
};

function createHorizontalStackBlock({
  blockIDs,
}: {
  blockIDs: string[];
}): HorizontalStackBlockModel {
  return createNode({
    __typename: "HorizontalStackBlock",
    id: createID(),
    blockIDs,
  });
}

export type BlockModel =
  | HeroBlockModel
  | ContentBlockModel
  | HorizontalStackBlockModel;

export type LayoutModel = {
  __typename: "Layout";
  id: string;
  page: string;
  blockIDs: string[];
};

function createLayout({
  page,
  blockIDs,
}: {
  page: string;
  blockIDs: string[];
}): LayoutModel {
  return createNode({
    __typename: "Layout",
    id: createID(),
    page,
    blockIDs,
  });
}

function createEntities<E extends Node>(
  entities: E[]
): {
  byID: Record<string, E>;
  asArray: E[];
} {
  const byID = Object.fromEntries(
    entities.map((entity) => [entity.id, entity])
  );

  return { byID, asArray: entities };
}

const LIVING_ROOM_CATEGORY = createCategory({
  name: "Living Room",
  slug: "living-room",
});

const KITCHEN_CATEGORY = createCategory({
  name: "Kitchen",
  slug: "kitchen",
});

const OUTDOOR_CATEGORY = createCategory({
  name: "Outdoor",
  slug: "outdoor",
});

const LIVING_ROOM_PRODUCTS = [
  "Sofa",
  "Love Seat",
  "Coffee Table",
  "End Table",
  "Lamp",
  "Chair",
  "Rug",
  "Bookshelf",
  "TV Stand",
].map((name) =>
  createProduct({
    name,
    price: Math.round(Math.random() * 200 + 50),
    categoryID: LIVING_ROOM_CATEGORY.id,
  })
);

const KITCHEN_PRODUCTS = [
  "Kitchen Island",
  "Stand Mixer",
  "Hand Towels",
  "Fridge",
].map((name) =>
  createProduct({
    name,
    price: Math.round(Math.random() * 200 + 50),
    categoryID: KITCHEN_CATEGORY.id,
  })
);

const OUTDOOR_PRODUCTS = ["Chair", "Table", "Umbrella"].map((name) =>
  createProduct({
    name,
    price: Math.round(Math.random() * 200 + 50),
    categoryID: OUTDOOR_CATEGORY.id,
  })
);

const PRODUCT_OPTIONS = [
  ...LIVING_ROOM_PRODUCTS,
  ...KITCHEN_PRODUCTS,
  ...OUTDOOR_PRODUCTS,
].flatMap((product) => {
  return ["Red", "White", "Beige"]
    .filter(() => Boolean(Math.round(Math.random())))
    .map((name) =>
      createProductOption({
        name,
        priceModifier: Math.round(Math.random() * 10) + 10,
        productID: product.id,
      })
    );
});

const HERO_BLOCK = createHeroBlock({ color: "#c66" });

const HORIZONTAL_BLOCKS_TOP = [
  createContentBlock({ content: "The sickest deals west of the Mississippi!" }),
  createHeroBlock({ color: "#bbb" }),
];

const HORIZONTAL_STACK_BLOCK_TOP = createHorizontalStackBlock({
  blockIDs: HORIZONTAL_BLOCKS_TOP.map((block) => block.id),
});

const HORIZONTAL_BLOCKS_BOTTOM = [
  createHeroBlock({ color: "#bbb" }),
  createContentBlock({
    content: "The sickest deals east of the Mississippi!",
  }),
];

const HORIZONTAL_STACK_BLOCK_BOTTOM = createHorizontalStackBlock({
  blockIDs: HORIZONTAL_BLOCKS_BOTTOM.map((block) => block.id),
});

const LAYOUT = createLayout({
  page: "home",
  blockIDs: [
    HERO_BLOCK,
    HORIZONTAL_STACK_BLOCK_TOP,
    HORIZONTAL_STACK_BLOCK_BOTTOM,
  ].map((block) => block.id),
});

const database = {
  nodes,
  categories: createEntities([
    LIVING_ROOM_CATEGORY,
    KITCHEN_CATEGORY,
    OUTDOOR_CATEGORY,
  ]),
  products: createEntities([
    ...LIVING_ROOM_PRODUCTS,
    ...KITCHEN_PRODUCTS,
    ...OUTDOOR_PRODUCTS,
  ]),
  productOptions: createEntities(PRODUCT_OPTIONS),
  filters: createEntities(
    ["Red", "White", "Beige"].map((name) => createFilter({ name }))
  ),
  blocks: createEntities<BlockModel>([
    HERO_BLOCK,
    HORIZONTAL_STACK_BLOCK_TOP,
    HORIZONTAL_STACK_BLOCK_BOTTOM,
    ...HORIZONTAL_BLOCKS_TOP,
    ...HORIZONTAL_BLOCKS_BOTTOM,
  ]),
  layouts: createEntities([LAYOUT]),
};

export default database;
