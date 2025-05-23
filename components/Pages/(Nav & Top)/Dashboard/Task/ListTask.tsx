import Button from "@/components/Reusable/Button";
import { TaskType } from "@/interfaces/Task/TaskType";
import MountainTask from "@/components/Elements/Svg/Mountain/MountainTask";
import { useContext, useState, useEffect, useRef } from "react";
import { ModalContext } from "@/components/Provider/ModalProvider";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import TaskCard from "./ListTask/TaskCard";
import AnimationElementsListUtils from "@/lib/AnimationElementsListUtils";
import LoadingStatus from "@/components/Elements/General/LoadingStatus";

export default function ListTask({
  filter,
  tasks,
  setTasks,
  loadingTask,
}: {
  filter: string;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
  loadingTask: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const [changingTaskIds, setChangingTaskIds] = useState<string[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const { setIsOpen } = useContext(ModalContext);
  const { setEvents } = useContext(DashboardContext);
  const { capturePositions, animateFLIP } = AnimationElementsListUtils({
    listRef,
  });

  useEffect(() => {
    capturePositions();
  }, [tasks]);

  useEffect(() => {
    const getFilteredTasks = () => {
      switch (filter) {
        case "Completada":
          return tasks.filter((e) => e.status === "completed");
        case "Alta":
          return tasks.filter(
            (e) => e.priority === "high" && e.status !== "completed"
          );
        case "Media":
          return tasks.filter(
            (e) => e.priority === "medium" && e.status !== "completed"
          );
        case "Baja":
          return tasks.filter(
            (e) => e.priority === "low" && e.status !== "completed"
          );
        case "":
          return tasks.filter((e) => e.status !== "completed");
        default:
          return tasks;
      }
    };

    capturePositions();
    setFilteredTasks(getFilteredTasks());

    requestAnimationFrame(() => {
      animateFLIP();
    });

    if (isInitialRender) {
      setTimeout(() => {
        setIsInitialRender(false);
      }, 100);
    }
  }, [tasks, filter, isInitialRender]);

  const handleStatusChange = (taskId: string) => {
    setChangingTaskIds((prev) => [...prev, taskId]);
    setTimeout(() => {
      setChangingTaskIds((prev) => prev.filter((id) => id !== taskId));
    }, 800);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div
        ref={listRef}
        className="flex flex-col w-full gap-4 h-[296px] pt-1 overflow-y-auto overflow-x-hidden transition-all duration-300"
      >
        {loadingTask ? (
          <LoadingStatus text="tareas" />
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} data-id={task._id}>
              <TaskCard
                task={task}
                setIsChange={handleStatusChange}
                isChange={changingTaskIds.includes(task._id)}
                setEvents={setEvents}
                setTasks={setTasks}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 justify-center h-full bg-quaternary-100 rounded-2xl py-4 transition-all duration-500">
            <MountainTask />
            <p className="text-primary-500 text-xl text-center mx-1 font-medium">
              El día está en blanco. ¡Agrega tus tareas
              {filter ? ` ${filter}` : ""}!
            </p>
          </div>
        )}
      </div>
      <div className="transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]">
        <Button
          size="large"
          onClick={() => setIsOpen({ text: "task" })}
          button="tertiary"
          type="button"
          className="w-full"
        >
          Nueva Tarea
        </Button>
      </div>
    </div>
  );
}
