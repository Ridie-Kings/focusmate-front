import { EllipsisVertical } from "lucide-react";
import Dot from "@/components/Elements/General/Dot";
import TemplateBox from "@/components/Elements/General/TemplateBox";
import Button from "@/components/Reusable/Button";

const DEFAULT_ITEMS = ["Trabajo", "Estudios", "Universidad", "Salud"];

interface CategoriesProps {
  inView?: boolean;
  items?: string[];
}

export default function Categories({
  inView = false,
  items = DEFAULT_ITEMS,
}: CategoriesProps) {
  return (
    <TemplateBox grid="h-full gap-4 flex-1" link="" title="Categories">
      <ul className="flex flex-col gap-4 h-full w-full">
        {items.map((item) => (
          <li key={item} className="flex w-full justify-between items-center">
            <div className="flex gap-4 items-center">
              <Dot size={15} />
              <label>{item}</label>
            </div>
            <EllipsisVertical
              size={20}
              className="text-gray-100 cursor-pointer"
            />
          </li>
        ))}
      </ul>
      <Button button="tertiary" type="button">
        Añadir Categoría
      </Button>
    </TemplateBox>
  );
}
