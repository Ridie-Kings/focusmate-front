import { Board } from "@/components/Pages/(Nav & Top)/Task/Board";
import { getMyTask } from "@/services/Task/getMyTask";

export default async function Task() {
  const tasks = await getMyTask();

  return (
    <div className="flex-1 w-full flex flex-col text-neutral-50">
      <Board prevTasks={tasks.res} />
    </div>
  );
}
