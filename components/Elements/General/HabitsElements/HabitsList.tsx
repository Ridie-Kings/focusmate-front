import { BedDouble, Bike, Book, ChefHat, CircleHelp } from "lucide-react";
import Divider from "@/components/Elements/General/Divider";
import { itemsType } from "@/components/Elements/Dashboard/Habits";

export default function HabitsList({
  habits,
  handleToggle,
}: {
  habits: itemsType[];
  handleToggle: (id: number) => void;
}) {
  const renderIcon = (type: string) => {
    switch (type) {
      case "study":
        return <Book />;
      case "food":
        return <ChefHat />;
      case "sleep":
        return <BedDouble />;
      case "sport":
        return <Bike />;
      default:
        return <CircleHelp />;
    }
  };

  return (
    <ul className="w-full flex flex-col gap-4">
      {habits.map((habit) => (
        <li key={habit.id} className="flex gap-4">
          <div className="flex-1 flex gap-5 border px-4 py-1 rounded-lg items-center hover:shadow-lg transition-all duration-300 ease-in-out">
            {renderIcon(habit.type)}
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
