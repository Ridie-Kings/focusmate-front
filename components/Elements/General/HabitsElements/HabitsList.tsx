import { BedDouble, Bike, Book, ChefHat, CircleHelp } from "lucide-react";
import Divider from "@/components/Elements/General/Divider";
import { itemsType } from "@/components/Pages/Habits";

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
        return <Book size={30} />;
      case "food":
        return <ChefHat size={30} />;
      case "sleep":
        return <BedDouble size={30} />;
      case "sport":
        return <Bike size={30} />;
      default:
        return <CircleHelp size={30} />;
    }
  };

  return (
    <ul className="w-full flex flex-col gap-4">
      {habits.map((habit) => (
        <li key={habit.id} className="flex items-center gap-4">
          <div className="flex-1 flex gap-3 border p-2 rounded-lg items-center">
            {renderIcon(habit.type)}
            <Divider width="1px" height="80%" />
            <div className="flex flex-col gap-1">
              <p>{habit.label}</p>
              <p className="text-accent text-sm">{habit.time}</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={habit.done}
            onChange={() => handleToggle(habit.id)}
            className={`cursor-pointer size-6 border-2 rounded appearance-none ${
              habit.done
                ? "bg-primary-green border-primary-bg-primary-green"
                : "bg-white border-black"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
