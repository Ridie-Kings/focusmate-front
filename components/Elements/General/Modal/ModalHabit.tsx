import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { AudioLines, BookHeart, Text, AlertCircle } from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";

import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { createHabit } from "@/services/Habits/createHabit";
import BtnSend from "./Modal/BtnSend";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { updateHabit } from "@/services/Habits/updateHabit";

type Frequency = "daily" | "weekly" | "monthly" | "";
type HabitFormData = {
  _id: string | undefined;
  name: string;
  description: string;
  frequency: Frequency;
  type: string;
  time?: Date;
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
  isOpen: { text: string; other?: unknown };
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: unknown }>>;
}

export default function ModalHabit({ setIsOpen, isOpen }: ModalHabitProps) {
  const { setHabits } = useContext(DashboardContext);

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

  useEffect(() => {
    if (
      isOpen.other &&
      isOpen.other instanceof Object &&
      "name" in isOpen.other
    ) {
      setHabit(() => ({
        ...(isOpen.other as HabitFormData),
      }));
    }
  }, [isOpen.other]);

  const validateHabit = useCallback((): boolean => {
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
  }, [habit]);

  const updateHabitField = useCallback(
    <K extends keyof HabitFormData>(field: K, value: HabitFormData[K]) => {
      setHabit((prev) => ({ ...prev, [field]: value }));
      if (error) setError(null);
    },
    [error]
  );

  const handleUpdateHabit = useCallback(async () => {
    if (isLoading) return;

    try {
      setError(null);

      if (!validateHabit()) {
        return;
      }

      setIsLoading(true);

      const habitData = {
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        type: habit.type,
      };

      const res = await updateHabit({ _id: habit._id ?? "", habit: habitData });

      if (res.success && res.res) {
        setHabits((prev) =>
          prev.map((prevTask) =>
            prevTask._id === habit._id ? res.res : prevTask
          )
        );
      } else {
        const errorMessage =
          typeof res.res === "string"
            ? res.res
            : "Error al modificar el hábito";
        setError(errorMessage);
        console.error("Error al crear el hábito", res.res);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsOpen({ text: "" });
      setIsLoading(false);
    }
  }, [habit, validateHabit, setHabits, setIsOpen, isLoading]);

  const handleCreateHabit = useCallback(async () => {
    if (isLoading) return;

    try {
      setError(null);

      if (!validateHabit()) {
        return;
      }

      setIsLoading(true);

      const habitData = {
        name: habit.name,
        description: habit.description,
        frequency: habit.frequency,
        type: habit.type,
      };

      const res = await createHabit({ habit: habitData });

      if (res.success && res.res) {
        setHabits((prevHabits) => {
          if (!prevHabits) return [res.res as HabitsType];
          return [...prevHabits, res.res as HabitsType];
        });
        setIsOpen({ text: "" });
        setHabit({
          _id: undefined,
          name: "",
          description: "",
          frequency: "",
          type: "",
        });
      } else {
        const errorMessage =
          typeof res.res === "string" ? res.res : "Error al crear el hábito";
        setError(errorMessage);
        console.error("Error al crear el hábito", res.res);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  }, [habit, validateHabit, setHabits, setIsOpen, isLoading]);

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
          icon={<BookHeart />}
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
