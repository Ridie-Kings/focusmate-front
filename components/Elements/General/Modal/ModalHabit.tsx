import { Dispatch, SetStateAction, useState } from "react";
import { AudioLines, BookHeart, Text, AlertCircle } from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";
import { createHabit } from "@/services/Habits/createHabit";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import BtnSend from "./Modal/BtnSend";

type Frequency = "daily" | "weekly" | "monthly" | "";
type HabitFormData = {
  name: string;
  description: string;
  frequency: Frequency;
  type: string;
};

type HabitOption = {
  label: string;
  value: string;
};

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

interface ModalHabitProps {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (data: { type: string; item: HabitsType }) => void;
}

export default function ModalHabit({ setIsOpen, setItem }: ModalHabitProps) {
  const [habit, setHabit] = useState<HabitFormData>({
    name: "",
    description: "",
    frequency: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateHabit = (): boolean => {
    if (!habit.name.trim()) {
      setError("El nombre del hábito es obligatorio");
      return false;
    }

    if (!habit.frequency) {
      setError("La frecuencia es obligatoria");
      return false;
    }

    if (!habit.type) {
      setError("El tipo de hábito es obligatorio");
      return false;
    }

    return true;
  };

  const updateHabitField = <K extends keyof HabitFormData>(
    field: K,
    value: HabitFormData[K]
  ) => {
    setHabit((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleCreateHabit = async () => {
    try {
      setError(null);

      if (!validateHabit()) {
        return;
      }

      setIsLoading(true);
      const res = await createHabit({ habit });

      if (res.success) {
        setItem({ type: "habit", item: res.res });
        setIsOpen("");
      } else {
        setError(
          typeof res.res === "string" ? res.res : "Error al crear el hábito"
        );
        console.error("Error al crear el hábito", res.res);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    return (
      <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
        <AlertCircle size={16} />
        <span>{error}</span>
      </div>
    );
  };

  const renderSelectOptions = (
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
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder="Título"
        value={habit.name}
        className={`text-2xl outline-none ${
          error && !habit.name ? "border-red-500 border-b-2" : "text-gray-500"
        }`}
        onChange={(e) => updateHabitField("name", e.target.value)}
      />

      {renderErrorMessage()}

      <div className="flex flex-col gap-6 w-full">
        <InputModal
          type="text"
          placeholder="Descripcion"
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
          icon={<BookHeart />}
        />
      </div>

      <BtnSend
        handleClick={handleCreateHabit}
        isLoading={isLoading}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
