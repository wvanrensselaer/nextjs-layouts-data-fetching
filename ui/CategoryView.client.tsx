import { Category } from "../graphql/types";
import Column from "./design/Column";
import Grid from "./design/Grid";
import ProductLink from "./design/ProductLink";

type Props = {
  category: Category;
};

export default function CategoryView({ category }: Props) {
  return (
    <Grid>
      {category.products.map((product) => (
        <Column key={product.id} size={3}>
          <div style={{ marginBottom: "1rem" }}>
            <ProductLink
              href={`/product/${product.id}`}
              name={product.name}
              price={product.price}
              options={product.options}
            />
          </div>
        </Column>
      ))}
    </Grid>
  );
}
