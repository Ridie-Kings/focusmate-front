import {
  BedDouble,
  Bike,
  Book,
  ChefHat,
  CircleHelp,
  GlassWater,
  Trash2,
} from "lucide-react";
import { useMemo, useCallback } from "react";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { updateHabit } from "@/services/Habits/updateHabit";
import { removeHabit } from "@/services/Habits/removeHabit";

const HABIT_TYPES = {
  DRINK: "drink",
  STUDY: "study",
  FOOD: "food",
  SLEEP: "sleep",
  SPORT: "sport",
};

interface HabitsListProps {
  habits: HabitsType[];
  setHabits: React.Dispatch<React.SetStateAction<HabitsType[]>>;
}

const HabitItem = ({
  habit,
  onToggle,
  onRemove,
}: {
  habit: HabitsType;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  const { _id, status, type, name, description } = habit;

  const getIconClass = (isCompleted: boolean) => {
    return `rounded-lg p-2 transition-all duration-300 ${
      isCompleted
        ? "bg-gray-100 text-gray-500 group-hover:bg-gray-100"
        : "bg-secondary-100 group-hover:bg-secondary-500"
    }`;
  };

  const renderIcon = (habitType: string, isCompleted: boolean) => {
    const iconClass = getIconClass(isCompleted);

    switch (habitType) {
      case HABIT_TYPES.DRINK:
        return <GlassWater size={48} className={iconClass} />;
      case HABIT_TYPES.STUDY:
        return <Book size={48} className={iconClass} />;
      case HABIT_TYPES.FOOD:
        return <ChefHat size={48} className={iconClass} />;
      case HABIT_TYPES.SLEEP:
        return <BedDouble size={48} className={iconClass} />;
      case HABIT_TYPES.SPORT:
        return <Bike size={48} className={iconClass} />;
      default:
        return <CircleHelp size={48} className={iconClass} />;
    }
  };

  return (
    <li className="flex items-center gap-4">
      <div
        className={`flex-1 flex h-full gap-3 border-2 p-2 rounded-lg items-center group transition-all duration-300 ${
          status
            ? "border-gray-300 hover:bg-gray-300"
            : "border-primary-500 bg-primary-100 hover:bg-gray-200"
        }`}
      >
        {renderIcon(type, status)}
        <div
          className={`w-0.5 rounded-full h-3/4 transition-all duration-300 ${
            status ? "bg-secondary-600 group-hover:bg-white" : "bg-primary-500"
          }`}
        />
        <div className="flex flex-col flex-1 gap-1">
          <p
            className={`px-2 transition-all duration-300 ${
              status
                ? "text-gray-400 group-hover:text-white"
                : "text-primary-500"
            }`}
          >
            {name}
          </p>
          <div
            className={`flex gap-2 text-sm items-center place-content-between w-full transition-all duration-300 px-2 ${
              status
                ? "text-gray-400 group-hover:text-white"
                : "text-primary-400"
            }`}
          >
            {description}
          </div>
        </div>
        <Trash2
          size={24}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(_id);
          }}
          className={`${
            status
              ? "text-gray-400 group-hover:text-white"
              : "text-primary-500 group-hover:text-primary-700"
          } cursor-pointer transition-all duration-300`}
          aria-label="Eliminar hábito"
        />
      </div>
      <input
        type="checkbox"
        checked={status}
        onChange={() => onToggle(_id)}
        className={`cursor-pointer size-6 border-2 rounded appearance-none ${
          status
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-gray-500"
        }`}
        aria-label={`Marcar hábito ${name} como ${
          status ? "incompleto" : "completado"
        }`}
      />
    </li>
  );
};

export default function HabitsList({ habits, setHabits }: HabitsListProps) {
  const handleToggle = useCallback(
    async (id: string) => {
      setHabits((prevHabits) => {
        const updatedHabits = prevHabits.map((habit) =>
          habit._id === id ? { ...habit, status: !habit.status } : habit
        );

        const habitToUpdate = updatedHabits.find((habit) => habit._id === id);
        if (habitToUpdate) {
          updateHabit({
            _id: habitToUpdate._id,
            habit: { status: habitToUpdate.status },
          })
            .then((res) => console.log("Habit updated:", res))
            .catch((error) => {
              console.error("Error updating habit:", error);
              setHabits((prev) =>
                prev.map((habit) =>
                  habit._id === id ? { ...habit, status: !habit.status } : habit
                )
              );
            });
        }

        return updatedHabits;
      });
    },
    [setHabits]
  );

  const handleRemoveHabit = useCallback(
    async (id: string) => {
      const habitToRemove = habits.find((habit) => habit._id === id);
      if (!habitToRemove) return;

      setHabits((prev) => prev.filter((habit) => habit._id !== id));

      try {
        const res = await removeHabit({ _id: id });
        if (!res.success) {
          console.error("Failed to delete habit:", res.res);
          setHabits((prev) => [...prev, habitToRemove]);
        }
      } catch (error) {
        console.error("Error deleting habit:", error);
        setHabits((prev) => [...prev, habitToRemove]);
      }
    },
    [habits, setHabits]
  );

  if (habits.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        No hay hábitos para mostrar.
      </div>
    );
  }

  return (
    <ul
      className="w-full h-full flex flex-col gap-4"
      aria-label="Lista de hábitos"
    >
      {habits.map((habit) => (
        <HabitItem
          key={habit._id}
          habit={habit}
          onToggle={handleToggle}
          onRemove={handleRemoveHabit}
        />
      ))}
    </ul>
  );
}
