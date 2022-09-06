import { useSearchParam } from "next/dist/client/components/hooks-client";
import Link from "next/link";
import { Product } from "../graphql/types";
import ColorSwatch from "./design/ColorSwatch";

type Props = {
  product: Product;
};

export default function ProductView({ product }: Props) {
  const selectedOptionID = useSearchParam("option");

  return (
    <div
      style={{
        border: "1px solid #c8c8c8",
        borderRadius: "2px",
        padding: "1rem",
      }}
    >
      <div>{product.name}</div>
      <div style={{ marginTop: "1rem" }}>${product.price}</div>
      {product.options.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {product.options.map((option) => (
            <Link
              key={option.id}
              href={`/product/${product.id}?option=${option.id}`}
            >
              <ColorSwatch
                color={option.name.toLowerCase()}
                isSelected={option.id === selectedOptionID}
              />
            </Link>
          ))}
        </div>
      )}
      <button disabled style={{ marginTop: "1rem" }}>
        Add to Cart
      </button>
    </div>
  );
}
