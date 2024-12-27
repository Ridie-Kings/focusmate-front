import { Ellipsis, Pen, Trash } from "lucide-react";
import Dot from "../General/Dot";
import TemplateBox from "../General/TemplateBox";
import { motion } from "motion/react";
const items = ["Trabajo", "Estudios", "Universidad", "Salud"];

export default function Categories({ inView }: { inView: boolean }) {
  return (
    <motion.div
      layout
      className={!inView ? "flex-1" : "h-80 max-h-96"}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <TemplateBox grid="h-full gap-2 flex-1" link="" title="Categories">
        <ul className="flex flex-col gap-2 h-full w-full">
          {items.map((item) => (
            <li key={item} className="flex w-full place-content-between">
              <div className="flex gap-1 items-center">
                <Dot size={15} />
                <label>{item}</label>
              </div>
              <div className="flex gap-1 text-gray-100">
                <Pen size={20} />
                <Trash size={20} />
                <Ellipsis size={20} />
              </div>
            </li>
          ))}
        </ul>
      </TemplateBox>
    </motion.div>
  );
}
