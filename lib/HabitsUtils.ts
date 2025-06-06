import { TypeIsOpen } from "@/interfaces/Modal/ModalType";
import { HabitFormData, HabitsType } from "@/interfaces/Habits/HabitsType";
import { createHabit } from "@/services/Habits/createHabit";
import { updateHabit } from "@/services/Habits/updateHabit";
import { useCallback } from "react";
import { useDashboardStore } from "@/stores/dashboardStore";

export default function HabitsUtils({
  createdHabit,
  habits,
  setHabits,
  setIsLoading,
  setError,
  setIsOpen,
  isLoading,
}: {
  setIsOpen?: React.Dispatch<React.SetStateAction<TypeIsOpen>>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading?: boolean;
  createdHabit?: HabitFormData;
  habits: HabitsType[];
  setHabits: React.Dispatch<React.SetStateAction<HabitsType[]>>;
}) {
  const { removeHabit } = useDashboardStore((state) => state.actions);

  const validateHabit = useCallback((): boolean => {
    if (!createdHabit || !createdHabit.name || !createdHabit.name.trim()) {
      if (setError) setError("El nombre del hábito es obligatorio");
      return false;
    }

    if (!createdHabit.frequency) {
      if (setError) setError("La frecuencia es obligatoria");
      return false;
    }

    if (!createdHabit.type) {
      if (setError) setError("El tipo de hábito es obligatorio");
      return false;
    }

    return true;
  }, [createdHabit, setError]);

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
              console.error("Error updating habit:", error.message);
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
        const res = await removeHabit(id);
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

  const handleUpdateHabit = useCallback(async () => {
    if (isLoading || !setIsLoading || !setError || !setIsOpen || !createdHabit)
      return;

    try {
      setError(null);

      if (!validateHabit()) {
        return;
      }

      setIsLoading(true);

      const habitData = {
        name: createdHabit.name,
        description: createdHabit.description,
        frequency: createdHabit.frequency,
        type: createdHabit.type,
      };

      const res = await updateHabit({
        _id: createdHabit._id ?? "",
        habit: habitData,
      });

      if (res.success && res.res) {
        setHabits((prev) =>
          prev.map((prevTask) =>
            prevTask._id === createdHabit._id ? res.res : prevTask
          )
        );
      } else {
        const errorMessage =
          typeof res.res === "string"
            ? res.res
            : "Error al modificar el hábito";
        setError(errorMessage);
        console.error("Error al modificar el hábito", res.res);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Error inesperado. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsOpen({ text: "" });
      setIsLoading(false);
    }
  }, [
    createdHabit,
    validateHabit,
    setHabits,
    setIsOpen,
    setIsLoading,
    setError,
    isLoading,
  ]);

  const handleCreateHabit = useCallback(async () => {
    if (isLoading || !setIsLoading || !setError || !setIsOpen || !createdHabit)
      return;

    try {
      setError(null);

      if (!validateHabit()) {
        return;
      }

      setIsLoading(true);

      const habitData = {
        name: createdHabit.name,
        description: createdHabit.description,
        frequency: createdHabit.frequency,
        type: createdHabit.type,
      };

      const res = await createHabit({ habit: habitData });

      if (res.success && res.res) {
        setHabits((prevHabits) => {
          if (!prevHabits) return [res.res as HabitsType];
          return [...prevHabits, res.res as HabitsType];
        });
        setIsOpen({ text: "" });
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
  }, [
    createdHabit,
    validateHabit,
    setHabits,
    setIsOpen,
    setIsLoading,
    setError,
    isLoading,
  ]);

  return {
    handleToggle,
    handleRemoveHabit,
    handleCreateHabit,
    handleUpdateHabit,
  };
}
