import HabitsList from "@/components/Elements/General/HabitsElements/HabitsList";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { Dispatch, SetStateAction } from "react";

export default function ListHabits({
  items,
  setHabits,
}: {
  items: HabitsType[];
  setHabits: Dispatch<SetStateAction<HabitsType[]>>;
}) {
  return (
    <div className="w-1/2 px-5 flex flex-col gap-5 font-medium">
      <p className="text-center text-2xl">Listado de Hábitos</p>
      <HabitsList habits={items} setHabits={setHabits} />
      <button className="w-full bg-black py-2 rounded-full text-white text-lg">
        Agregar Hábito
      </button>
    </div>
  );
}
