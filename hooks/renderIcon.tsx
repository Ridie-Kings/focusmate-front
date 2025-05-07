import { HABIT_TYPES } from "@/interfaces/Habits/HabitsType";
import {
  BedDouble,
  Bike,
  Book,
  ChefHat,
  CircleHelp,
  GlassWater,
  Workflow,
} from "lucide-react";

export default function renderIconHabit({
  habitType,
  isCompleted,
}: {
  habitType: string;
  isCompleted: boolean;
}) {
  const getIconClass = (isCompleted: boolean) => {
    return `rounded-lg p-2 transition-all duration-300 ${
      isCompleted
        ? "bg-gray-100 text-gray-500 group-hover:bg-gray-100"
        : "bg-secondary-100 group-hover:bg-secondary-500"
    }`;
  };

  return () => {
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
      case HABIT_TYPES.WORK:
        return <Workflow size={48} className={iconClass} />;
      default:
        return <CircleHelp size={48} className={iconClass} />;
    }
  };
}
