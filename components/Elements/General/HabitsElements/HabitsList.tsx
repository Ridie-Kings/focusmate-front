import { Pen, Trash2 } from "lucide-react";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import HabitsUtils from "@/lib/HabitsUtils";
import Menu from "@/components/Reusable/Menu";
import { useModalStore } from "@/stores/modalStore";
import renderIconHabit from "@/config/RenderIconHabit";

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
  const { setIsOpen } = useModalStore((state) => state.actions);

  return (
    <li className="flex items-center gap-4">
      <div
        className={`flex-1 flex h-full gap-3 border-2 p-2 rounded-lg items-center group transition-all duration-300 ${
          status
            ? "border-gray-300 hover:bg-gray-300"
            : "border-primary-500 bg-primary-100 hover:bg-gray-200"
        }`}
      >
        {renderIconHabit({ habitType: type, isCompleted: status })()}
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
        <Menu
          items={[
            {
              label: "Modificar",
              icon: <Pen />,
              onClick: () => setIsOpen({ text: "habit", other: habit }),
            },
            {
              label: "Eliminar",
              icon: <Trash2 />,
              color: "red",
              onClick: () => onRemove(_id),
            },
          ]}
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
  const { handleToggle, handleRemoveHabit } = HabitsUtils({
    habits,
    setHabits,
  });

  if (habits.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        No hay hábitos para mostrar.
      </div>
    );
  }

  return (
    <ul
      className="w-full h-[320px] flex flex-col overflow-y-auto gap-4"
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
