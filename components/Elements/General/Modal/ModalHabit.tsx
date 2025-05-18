import { useState, useContext, useCallback, useEffect } from "react";
import { AudioLines, Text, AlertCircle } from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";

import BtnSend from "./Modal/BtnSend";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import HabitsUtils from "@/lib/HabitsUtils";
import {
  HabitFormData,
  HabitOption,
  ModalHabitProps,
} from "@/interfaces/Habits/HabitsType";
import renderIconHabit from "@/hooks/renderIcon";

const FREQUENCY_OPTIONS: HabitOption[] = [
  { label: "Diario", value: "daily" },
  { label: "Semanal", value: "weekly" },
  { label: "Cada Mes", value: "monthly" },
];

const TYPE_OPTIONS: HabitOption[] = [
  { label: "Estudio", value: "study" },
  { label: "Deporte", value: "sport" },
  { label: "Comida", value: "food" },
  { label: "Beber", value: "drink" },
  { label: "Trabajo", value: "work" },
];

export default function ModalHabit({ setIsOpen, prevHabit }: ModalHabitProps) {
  const { setHabits, habits } = useContext(DashboardContext);

  const [habit, setHabit] = useState<HabitFormData>({
    _id: undefined,
    name: "",
    description: "",
    frequency: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(habit._id);

  const { handleCreateHabit, handleUpdateHabit } = HabitsUtils({
    setError,
    setIsLoading,
    setHabits,
    isLoading,
    createdHabit: habit,
    setIsOpen,
    habits,
  });

  useEffect(() => {
    if (
      prevHabit &&
      prevHabit instanceof Object &&
      "name" in prevHabit
    ) {
      setHabit(() => ({
        ...(prevHabit as HabitFormData),
      }));
    }
  }, [prevHabit]);

  const updateHabitField = useCallback(
    <K extends keyof HabitFormData>(field: K, value: HabitFormData[K]) => {
      setHabit((prev) => ({ ...prev, [field]: value }));
      if (error) setError(null);
    },
    [error]
  );

  const renderErrorMessage = useCallback(() => {
    if (!error) return null;

    return (
      <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    );
  }, [error]);

  const renderSelectOptions = useCallback(
    (
      options: HabitOption[],
      field: keyof Pick<HabitFormData, "frequency" | "type">
    ) => (
      <div className="absolute top-7 flex flex-col bg-background-primary drop-shadow-lg rounded-lg p-2 gap-1 z-50">
        {options.map((option) => (
          <option
            key={option.value}
            className="p-2 cursor-pointer hover:bg-gray-100"
            onClick={() => updateHabitField(field, option.value)}
          >
            {option.label}
          </option>
        ))}
      </div>
    ),
    [updateHabitField]
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder="Título"
        defaultValue={habit.name}
        className={`text-2xl outline-none ${
          error && !habit.name ? "border-red-500 border-b-2" : "text-gray-500"
        }`}
        onChange={(e) => updateHabitField("name", e.target.value)}
      />

      {renderErrorMessage()}

      <div className="flex flex-col gap-6 w-full">
        <InputModal
          defaultValue={habit.description}
          type="text"
          placeholder="Descripción"
          onChange={(e) => updateHabitField("description", e.target.value)}
          icon={<Text />}
        />

        <InputModal
          type="select"
          placeholder={
            FREQUENCY_OPTIONS.find((option) => option.value === habit.frequency)
              ?.label || "Frecuencia"
          }
          option={renderSelectOptions(FREQUENCY_OPTIONS, "frequency")}
          icon={<AudioLines />}
        />

        <InputModal
          type="select"
          placeholder={
            TYPE_OPTIONS.find((prev) => prev.value === habit.type)?.label ||
            "Tipo de hábito"
          }
          option={renderSelectOptions(TYPE_OPTIONS, "type")}
          icon={renderIconHabit({
            habitType:
              TYPE_OPTIONS.find((prev) => prev.value === habit.type)?.value ||
              "",
            isCompleted: false,
          })()}
        />
      </div>

      <BtnSend
        text={isEditMode ? "Modificar" : undefined}
        loadingText={isEditMode ? "Modificando..." : undefined}
        handleClick={isEditMode ? handleUpdateHabit : handleCreateHabit}
        isLoading={isLoading}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
