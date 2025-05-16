"use client";
import { useEffect, useContext, useState } from "react";
import Date from "@/components/Elements/General/CurrentDate";
import Pomodoro from "@/components/Pages/(Nav & Top)/Dashboard/Pomodoro";
import Habits from "@/components/Pages/(Nav & Top)/Dashboard/Habits";
import Agenda from "@/components/Pages/(Nav & Top)/Dashboard/Agenda";
import TusTask from "@/components/Pages/(Nav & Top)/Dashboard/Task";
import Streaks from "./Dashboard/Streaks";

import { getMyTask } from "@/services/Task/getMyTask";
import { getMyHabits } from "@/services/Habits/getMyHabits";
import { getMyStreaks } from "@/services/Logs/getMyStreaks";
import { DashboardContext } from "@/components/Provider/DashboardProvider";

export default function Dashboard() {
  const [streaks, setStreaks] = useState<number>(0);
  const {
    setLoadingTask,
    setLoadingHabits,
    tasks,
    setTasks,
    habits,
    setHabits,
  } = useContext(DashboardContext);

  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const streaksData = await getMyStreaks();
        setStreaks(streaksData.res || 0);
      } catch (error) {
        console.error("Failed to load streaks:", error);
        setStreaks(0);
      }
    };

    fetchStreaks();
  }, [setStreaks]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTask(true);
      try {
        const tasksData = await getMyTask();
        setTasks(tasksData.success ? tasksData.res : []);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setTasks([]);
      } finally {
        setLoadingTask(false);
      }
    };

    fetchTasks();
  }, [setLoadingTask, setTasks]);

  useEffect(() => {
    const fetchHabits = async () => {
      setLoadingHabits(true);
      try {
        const habitsData = await getMyHabits();
        setHabits(habitsData.success ? habitsData.res : []);
      } catch (error) {
        console.error("Failed to load habits:", error);
        setHabits([]);
      } finally {
        setLoadingHabits(false);
      }
    };

    fetchHabits();
  }, [setLoadingHabits, setHabits]);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-7 gap-4 w-full h-full md:px-5 py-5">
      <Date />
      <Streaks number={streaks} />
      <Agenda />
      <Pomodoro />
      <TusTask tasksList={tasks} />
      <Habits habitsList={habits} />
    </div>
  );
}
