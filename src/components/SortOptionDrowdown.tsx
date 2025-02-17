import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  { label: "Best Match", value: "bestMatch" },
  { label: "Rent: 5000 - 10000", value: "rent_5000_10000" },
  { label: "Rent: 10000 - 15000", value: "rent_10000_15000" },
];

const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    "Best Match";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort by: {selectedLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <>
            <DropdownMenuItem
              key={option.value}
              className="cursor-pointer p-1"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
            <Separator />
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
