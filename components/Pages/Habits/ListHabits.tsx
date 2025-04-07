import HabitsList from "@/components/Elements/General/HabitsElements/HabitsList";
import { HabitsItemType } from "@/interfaces/Habits/Habits";

export default function ListHabits({
  items,
  handleToggle,
}: {
  items: HabitsItemType[];
  handleToggle: (id: number) => void;
}) {
  return (
    <div className="w-1/2 px-5 flex flex-col gap-5 font-medium">
      <p className="text-center text-2xl">Listado de Habitos</p>
      <HabitsList habits={items} handleToggle={handleToggle} />
      <button className="w-full bg-black-100 py-2 rounded-full text-white-100 text-lg">
        Agregar Hábito
      </button>
    </div>
  );
}
