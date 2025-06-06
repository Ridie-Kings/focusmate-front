import Divider from "@/components/Elements/General/Divider";
import PriorityBadge from "@/components/Elements/General/PriorityBadge";
import Menu from "@/components/Reusable/Menu";
import { Dispatch, SetStateAction } from "react";
import { AlarmCheck } from "lucide-react";
import { format } from "date-fns";
import { TaskType } from "@/interfaces/Task/TaskType";
import DropIndicator from "./DropIndicator";
import { useModalStore } from "@/stores/modalStore";
import TaskUtils from "@/lib/Task/TaskUtils";

type CardProps = {
  handleDragStart: (e: React.DragEvent, card: TaskType) => void;
  task: TaskType;
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
};

const Card = ({ task, setTasks, handleDragStart }: CardProps) => {
  const { setIsOpen } = useModalStore();
  const { handleDeleteTask } = TaskUtils({
    setTasks,
  });

  return (
    <>
      <DropIndicator beforeId={task._id} column={status} />
      <div
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e, {
            title: task.title,
            _id: task._id,
            status: task.status,
          } as TaskType)
        }
        className="cursor-grab flex flex-col gap-2 text-primary-500 border-l-5 border border-primary-500 rounded-lg p-4 active:cursor-grabbing w-full"
      >
        <div className="flex w-full place-content-between">
          <div className="flex items-center gap-2">
            <AlarmCheck />
            <p className="text-sm">
              {format(task.dueDate ?? new Date(), "dd MMMM")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <PriorityBadge priority={task.priority} status="" />
            <Menu
              items={[
                {
                  label: "Modificar",
                  onClick: () => setIsOpen({ text: "task", other: task }),
                },
                {
                  label: "Eliminar",
                  color: "red",
                  onClick: () => handleDeleteTask(task._id),
                },
              ]}
            />
          </div>
        </div>
        <Divider backgroundColor="#014e44" height="1.5px" />
        <p>{task.title}</p>
      </div>
    </>
  );
};

export default Card;
