import Link from "next/link";
import { usePathname } from "next/dist/client/components/hooks-client";
import { Category } from "../graphql/types";

type Props = {
  categories: Category[];
};

export default function Header(props: Props) {
  const pathname = usePathname();

  return (
    <nav>
      <Link
        href="/"
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          paddingRight: "0.5rem",
          textDecoration: "none",
        }}
      >
        Home
      </Link>
      {props.categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem",
            textDecoration: "none",
            ...(`/category/${category.slug}` === pathname
              ? {
                  borderBottom: "1px solid #666",
                }
              : {}),
          }}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
