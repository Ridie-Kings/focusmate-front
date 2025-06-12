import { useEffect } from "react";
import { useState } from "react";
import { getMyHabits } from "@/services/Habits/getMyHabits";
import { getMyTask } from "@/services/Task/getMyTask";
import { getMyStreaks } from "@/services/Logs/getMyStreaks";
import { useDashboardStore } from "@/stores/dashboardStore";

export const useDashboardData = () => {
  const [streaks, setStreaks] = useState<number>(0);
  const { setLoading, setTasks, setHabits } = useDashboardStore(
    (state) => state.actions
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [streaksData, tasksData, habitsData] = await Promise.all([
          getMyStreaks(),
          getMyTask(),
          getMyHabits(),
        ]);

        setStreaks(streaksData.res || 0);
        setTasks(tasksData.success ? tasksData.res : []);
        setHabits(habitsData.success ? habitsData.res : []);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setStreaks(0);
        setTasks([]);
        setHabits([]);
      } finally {
        setLoading("tasks", false);
        setLoading("habits", false);
      }
    };

    setLoading("tasks", true);
    setLoading("habits", true);
    fetchData();
  }, [setLoading, setTasks, setHabits]);

  return {
    streaks,
    tasks: useDashboardStore((state) => state.tasks),
    habits: useDashboardStore((state) => state.habits),
  };
};
