import Divider from "@/components/Elements/General/Divider";
import DropIndicator from "./DropIndicator";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import { AlarmCheck } from "lucide-react";
import { TaskType } from "@/interfaces/Task/TaskType";

type CardProps = TaskType & {
  handleDragStart: (e: React.DragEvent, card: TaskType) => void;
};

const Card = ({ title, _id, status, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={_id} column={status} />
      <div
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, { title, _id, status } as TaskType)
        }
        className="cursor-grab flex flex-col gap-2 text-primary-500 border-l-4 border border-primary-500 rounded-lg p-4 active:cursor-grabbing w-full"
      >
        <div className="flex w-full place-content-between">
          <div className="flex gap-2">
            <AlarmCheck />
            <p>17 Sep</p>
          </div>
          <PriorityBadge priority="high" status="" />
        </div>
        <Divider backgroundColor="#014e44" height="1.5px" />
        <p>{title}</p>
      </div>
    </>
  );
};

export default Card;
