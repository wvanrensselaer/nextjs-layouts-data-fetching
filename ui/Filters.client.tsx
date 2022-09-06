import Link from "next/link";
import { Filter } from "../graphql/types";
import ColorSwatch from "./design/ColorSwatch";
import {
  usePathname,
  useSearchParam,
} from "next/dist/client/components/hooks-client";

type Props = {
  filters: Filter[];
};

export default function Filters({ filters }: Props) {
  const pathname = usePathname();
  const selectedFilter = useSearchParam("filter");

  return (
    <div>
      <h3>Filters</h3>
      {filters.map((filter) => {
        const color = filter.name.toLowerCase();
        const isSelected = selectedFilter === color;

        return (
          <Link
            key={filter.id}
            style={{
              display: "block",
              ...(isSelected
                ? {
                    backgroundColor: "#ddd",
                  }
                : {}),
              marginBottom: "0.5rem",
            }}
            href={`${pathname}${isSelected ? "" : `?filter=${color}`}`}
          >
            <ColorSwatch color={filter.name.toLowerCase()} />
            {filter.name}
          </Link>
        );
      })}
    </div>
  );
}
