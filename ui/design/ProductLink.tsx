import Link from "next/link";
import { ProductOption } from "../../graphql/types";
import ColorSwatch from "./ColorSwatch";

type Props = {
  href: string;
  name: string;
  price: number;
  filter?: string;
  options: ProductOption[];
};

export default function ProductCard(props: Props) {
  return (
    <Link
      style={{
        border: "1px solid #c8c8c8",
        borderRadius: "2px",
        display: "block",
        padding: "1rem",
      }}
      href={props.href}
    >
      <div>{props.name}</div>
      <div style={{ marginTop: "1rem" }}>${props.price}</div>
      {props.options.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {props.options.map((option) => (
            <ColorSwatch key={option.id} color={option.name.toLowerCase()} />
          ))}
        </div>
      )}
    </Link>
  );
}
