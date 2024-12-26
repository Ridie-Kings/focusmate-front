import Divider from "../../General/Divider";
import { itemsType } from "../Habits";

export default function HabitsList({
  habits,
  handleToggle,
}: {
  habits: itemsType[];
  handleToggle: (id: number) => void;
}) {
  return (
    <ul className="flex-1 w-full flex flex-col gap-4">
      {habits.map((habit) => (
        <li key={habit.id} className="flex gap-4">
          <div className="flex-1 flex gap-5 border px-4 py-1 rounded-lg items-center hover:shadow-lg transition-all duration-300 ease-in-out">
            <div className="w-5 h-5 bg-black-100" />
            <Divider width="1px" height="80%" />
            <div>
              <p>{habit.label}</p>
              <p className="font-thin">{habit.time}</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={habit.done}
            onChange={() => handleToggle(habit.id)}
            className="cursor-pointer"
          />
        </li>
      ))}
    </ul>
  );
}
