import { getMyTask } from "@/services/Task/getMyTask";
import { Board } from "@/components/Elements/Pages/Task/Board";

export default async function Task() {
  const tasks = await getMyTask();

  return (
    <div className="flex-1 w-full flex flex-col text-neutral-50">
      <Board tasks={tasks} />
    </div>
  );
}
