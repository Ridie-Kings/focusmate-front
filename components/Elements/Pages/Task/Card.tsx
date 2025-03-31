import { Clock } from "lucide-react";
import { DropIndicator } from "./dropIndicator";
import { motion } from "motion/react";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import Divider from "@/components/Elements/General/Divider";
import { TaskType } from "@/interfaces/Task/TaskType";

type CardProps = TaskType & {
  handleDragStart: Function;
};

export const Card = ({
  title,
  _id,
  status,
  dueDate,
  priority,
  handleDragStart,
}: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={_id} status={status} />
      <motion.div
        layout
        layoutId={_id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, _id, status })}
        className="cursor-grab rounded border flex bg-white flex-col gap-4 border-gray-100 border-l-6 text-gray-100 p-4 active:cursor-grabbing"
      >
        <div className="flex place-content-between">
          <div className="flex gap-2">
            <Clock />{" "}
            {dueDate.toLocaleTimeString("es-ES", {
              day: "2-digit",
              month: "long",
            })}
          </div>
          <PriorityBadge priority={priority} />
        </div>
        <Divider />
        <p className="text-lg">{title}</p>
      </motion.div>
    </>
  );
};
