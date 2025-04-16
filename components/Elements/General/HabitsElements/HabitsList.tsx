import {
  BedDouble,
  Bike,
  Book,
  ChefHat,
  CircleHelp,
  GlassWater,
  Trash2,
} from "lucide-react";

import { Dispatch, SetStateAction } from "react";

import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { updateHabit } from "@/services/Habits/updateHabit";
import { removeHabit } from "@/services/Habits/removeHabit";

export default function HabitsList({
  habits,
  setHabits,
}: {
  habits: HabitsType[];
  setHabits: Dispatch<SetStateAction<HabitsType[]>>;
}) {
  const getIconClass = (status: boolean) => {
    return `rounded-lg p-2 transition-all duration-300 ${
      status 
        ? "bg-gray-100 text-gray-500 group-hover:bg-gray-100" 
        : "bg-secondary-100 group-hover:bg-secondary-500"
    }`;
  };

  const renderIcon = (type: string, status: boolean) => {
    const iconClasse = getIconClass(status);
    switch (type) {
      case "drink":
        return <GlassWater size={48} className={iconClasse} />;
      case "study":
        return <Book size={48} className={iconClasse} />;
      case "food":
        return <ChefHat size={48} className={iconClasse} />;
      case "sleep":
        return <BedDouble size={48} className={iconClasse} />;
      case "sport":
        return <Bike size={48} className={iconClasse} />;
      default:
        return <CircleHelp size={48} className={iconClasse} />;
    }
  };

  const handleToggle = async (id: string) => {
    const updatedHabits = habits.map((habit) =>
      habit._id === id ? { ...habit, status: !habit.status } : habit
    );

    setHabits(updatedHabits);

    const habitToUpdate = updatedHabits.find((habit) => habit._id === id);

    if (habitToUpdate) {
      try {
        const res = await updateHabit({
          _id: habitToUpdate._id,
          habit: { status: habitToUpdate.status },
        });
        console.log("Habit updated:", res);
      } catch (error) {
        console.error("Error updating habit:", error);
        setHabits((prev) => prev.map((habit) =>
          habit._id === id ? { ...habit, status: !habit.status } : habit
        ));
      }
    }
  };

  const handleRemoveHabit = async (_id: string) => {
    const habitToRemove = habits.find((habit) => habit._id === _id);

    if (!habitToRemove) return;

    setHabits((prev) => prev.filter((habit) => habit._id !== _id));

    try {
      const res = await removeHabit({ _id });
      if (res.success) {
        console.log("Habit deleted:", res.res);
      } else {
        console.error("Failed to delete habit:", res.res);
        setHabits((prev) => [...prev, habitToRemove]);
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      setHabits((prev) => [...prev, habitToRemove]);
    }
  };

  return (
    <ul className="w-full h-full flex flex-col gap-4">
      {habits.map((habit) => (
        <li key={habit._id} className="flex items-center gap-4">
          <div className={`flex-1 flex h-full gap-3 border-2 p-2 rounded-lg items-center group transition-all duration-300 ${
            habit.status 
              ? "border-gray-300 hover:bg-gray-300" 
              : " border-primary-500 bg-primary-100 hover:bg-gray-200"
          }`}>
            {renderIcon(habit.type, habit.status)}
            <div className={`w-0.5 rounded-full h-3/4 transition-all duration-300 ${
              habit.status 
                ? "bg-secondary-600 group-hover:bg-white" 
                : "bg-primary-500"
            }`} />
            <div className="flex flex-col flex-1 gap-1">
              <p className={`px-2 transition-all duration-300 ${
                habit.status 
                  ? "text-gray-400 group-hover:text-white" 
                  : "text-primary-500"
              }`}>
                {habit.name}
              </p>
              <div className={`flex gap-2 items-center place-content-between w-full transition-all duration-300 px-2 ${
                habit.status 
                  ? "text-gray-400 group-hover:text-white" 
                  : "text-primary-500"
              }`}>
                {habit.description}
                {/* <div className="flex items-center gap-1 px-2 py-1">
                  <Clock />
                  <p>{habit.time}</p>
                </div> 
                <div className="flex  gap-1 px-2 py-1">
                  <Calendar />
                  <p>{formatFrequency(habit.frequency)}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1">
                  <Bell />
                  <p>10&apos; antes</p>
                </div> */}
              </div>
            </div>
            <Trash2
              size={24}
              onClick={() => handleRemoveHabit(habit._id)}
              className={`${habit.status ? "text-gray-400 group-hover:text-white" : "text-primary-500 group-hover:text-primary-700"}  cursor-pointer transition-all duration-300`}
            />
          </div>
          <input
            type="checkbox"
            checked={habit.status}
            onChange={() => handleToggle(habit._id)}
            className={`cursor-pointer size-6 border-2 rounded appearance-none ${
              habit.status
                ? "bg-primary-500 border-primary-500"
                : "bg-white border-gray-500"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
