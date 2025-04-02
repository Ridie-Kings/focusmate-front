import { Clock } from "lucide-react";
import { DropIndicator } from "./dropIndicator";
import { motion } from "motion/react";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import Divider from "@/components/Elements/General/Divider";
import { TaskType } from "@/interfaces/Task/TaskType";
import { DragEvent } from "react";

type CardProps = TaskType & {
  handleDragStart: (e: DragEvent<Element>, card: TaskType) => void; // Updated function type
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
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          handleDragStart(e as unknown as DragEvent, {
            title,
            _id,
            status,
            dueDate,
            priority,
            userId: "",
            description: "",
            isDeleted: false,
            tags: [],
            category: "",
            subTasks: [],
          });
        }}
        className="cursor-grab rounded border flex bg-white flex-col gap-4 border-gray-100 border-l-6 text-gray-100 p-4 active:cursor-grabbing"
      >
        <div className="flex place-content-between">
          <div className="flex gap-2">
            <Clock />{" "}
            {dueDate instanceof Date
              ? dueDate.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                })
              : "No date"}{" "}
            {/* Added check if dueDate is a Date and fixed method */}
          </div>
          <PriorityBadge priority={priority} />
        </div>
        <Divider />
        <p className="text-lg">{title}</p>
      </motion.div>
    </>
  );
};
