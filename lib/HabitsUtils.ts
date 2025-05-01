import { useToast } from "@/components/Provider/ToastProvider";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { removeHabit } from "@/services/Habits/removeHabit";
import { updateHabit } from "@/services/Habits/updateHabit";
import { add } from "lodash";
import { useCallback } from "react";

export default function HabitsUtils({
  habits,
  setHabits,
}: {
  habits: HabitsType[];
  setHabits: React.Dispatch<React.SetStateAction<HabitsType[]>>;
}) {
  const { addToast } = useToast();
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
            .then((res) => {
              addToast({
                type: res.success ? "success" : "error",
                message: res.success
                  ? "Habit updated successfully"
                  : "Failed to update habit",
              });
            })
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

  return { handleToggle, handleRemoveHabit };
}
