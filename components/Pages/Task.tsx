import { Board } from "@/components/Elements/Pages/Task/Board";
import { TaskType } from "@/interfaces/Task/TaskType";

export default async function Task() {
  const tasks: TaskType[] = [];

  return (
    <div className="flex-1 w-full flex flex-col text-neutral-50">
      <Board tasks={tasks} />
    </div>
  );
}
