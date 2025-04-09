import {
  BedDouble,
  Bell,
  Bike,
  Book,
  Calendar,
  ChefHat,
  CircleHelp,
  Clock,
  EllipsisVertical,
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
  const renderIcon = (type: string) => {
    switch (type) {
      case "study":
        return (
          <Book
            size={48}
            className="bg-secondary-100 rounded-lg p-2 group-hover:bg-secondary-500 transition-all duration-300"
          />
        );
      case "food":
        return (
          <ChefHat
            size={48}
            className="bg-secondary-100 rounded-lg p-2 group-hover:bg-secondary-500 transition-all duration-300"
          />
        );
      case "sleep":
        return (
          <BedDouble
            size={48}
            className="bg-secondary-100 rounded-lg p-2 group-hover:bg-secondary-500 transition-all duration-300"
          />
        );
      case "sport":
        return (
          <Bike
            size={48}
            className="bg-secondary-100 rounded-lg p-2 group-hover:bg-secondary-500 transition-all duration-300"
          />
        );
      default:
        return (
          <CircleHelp
            size={48}
            className="bg-secondary-100 rounded-lg p-2 group-hover:bg-secondary-500 transition-all duration-300"
          />
        );
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
        setHabits(habits);
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
          <div className="flex-1 flex h-full gap-3 border-2 border-secondary-600 p-2 rounded-lg items-center hover:bg-secondary-600 group transition-all duration-300">
            {renderIcon(habit._id)}
            <div className="w-0.5 rounded-full h-3/4 bg-secondary-600 group-hover:bg-white transition-all duration-300" />
            <div className="flex flex-col flex-1 gap-1">
              <p className="text-primary-500 px-2 group-hover:text-white transition-all duration-300">
                {habit.name}
              </p>
              <div className="flex gap-2 items-center place-content-between w-full text-secondary-600 group-hover:text-white transition-all duration-300">
                <div className="flex items-center gap-1 px-2 py-1">
                  <Clock />
                  <p>21:00hrs</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1">
                  <Calendar />
                  <p>Lun a Vier</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-1">
                  <Bell />
                  <p>10&apos; antes</p>
                </div>
              </div>
            </div>
            <EllipsisVertical
              size={24}
              onClick={() => handleRemoveHabit(habit._id)}
              className="text-primary-500 group-hover:text-white cursor-pointer transition-all duration-300"
            />
          </div>
          <input
            type="checkbox"
            checked={habit.status}
            onChange={() => handleToggle(habit._id)}
            className={`cursor-pointer size-6 border-2 rounded appearance-none ${
              habit.status
                ? "bg-primary-500 border-primary-500"
                : "bg-white border-black"
            }`}
          />
        </li>
      ))}
    </ul>
  );
}
