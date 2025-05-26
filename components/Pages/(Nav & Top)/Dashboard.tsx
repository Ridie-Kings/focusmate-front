"use client";
import { useEffect, useContext, useState } from "react";
import CurrentDate from "@/components/Elements/General/CurrentDate";
import Pomodoro from "@/components/Pages/(Nav & Top)/Dashboard/Pomodoro";
import Habits from "@/components/Pages/(Nav & Top)/Dashboard/Habits";
import Agenda from "@/components/Pages/(Nav & Top)/Dashboard/Agenda";
import TusTask from "@/components/Pages/(Nav & Top)/Dashboard/Task";
import Streaks from "./Dashboard/Streaks";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { getMyTask } from "@/services/Task/getMyTask";
import { getMyHabits } from "@/services/Habits/getMyHabits";
import { getMyStreaks } from "@/services/Logs/getMyStreaks";
import { DashboardContext } from "@/components/Provider/DashboardProvider";
import { isSameDay } from "date-fns";

export default function Dashboard() {
  const [streaks, setStreaks] = useState<number>(0);

  const {
    setLoadingTask,
    setLoadingHabits,
    tasks,
    setTasks,
    habits,
    setHabits,
    userInfo,
  } = useContext(DashboardContext);

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem("tourCompleted");
    const userCreatedAt = new Date();
    const today = new Date();

    if (!hasCompletedTour && userCreatedAt && isSameDay(userCreatedAt, today)) {
      const driverObj = driver({
        showProgress: true,
        steps: [
          {
            element: "#date-component",
            popover: {
              title: "Current Date",
              description:
                "Shows today's date and helps you track your daily progress",
            },
          },
          {
            element: "#streaks-component",
            popover: {
              title: "Streaks",
              description:
                "Track your consecutive days of completing tasks and habits",
            },
          },
          {
            element: "#agenda-component",
            popover: {
              title: "Agenda",
              description: "View and manage your daily schedule",
            },
          },
          {
            element: "#agenda-component #small-calendar-component",
            popover: {
              title: "Small Calendar",
              description: "View your daily schedule",
            },
          },
          {
            element: "#agenda-component #timeline-component",
            popover: {
              title: "Timeline",
              description: "View your daily schedule",
            },
          },
          {
            element: "#pomodoro-component",
            popover: {
              title: "Pomodoro Timer",
              description:
                "Use the Pomodoro technique to boost your productivity",
            },
          },
          {
            element: "#pomodoro-component #nav-component",
            popover: {
              title: "Nav",
              description: "Navigate through the Pomodoro timer",
            },
          },
          {
            element: "#pomodoro-component #timer-component",
            popover: {
              title: "Timer",
              description: "Start, pause, and reset the timer",
            },
          },
          {
            element: "#pomodoro-component #add-task-component",
            popover: {
              title: "Add Task",
              description: "Add a task to the timer",
            },
          },
          {
            element: "#pomodoro-component #commands-component",
            popover: {
              title: "Commands",
              description: "Add a task to the timer",
            },
          },
          {
            element: "#pomodoro-component #settings",
            popover: {
              title: "Settings",
              description: "Change the timer settings",
            },
          },
          {
            element: "#tasks-component",
            popover: {
              title: "Tasks",
              description: "Manage your daily tasks and to-dos",
            },
          },
          {
            element: "#habits-component",
            popover: {
              title: "Habits",
              description: "Track and build your daily habits",
            },
          },
          {
            element: "#redirect",
            popover: {
              title: "Redirect",
              description: "Redirect to the dashboard",
            },
          },
        ],
        onDestroyStarted: () => {
          driverObj.destroy();
          localStorage.setItem("tourCompleted", "true");
        },
      });

      driverObj.drive();
    }
  }, [userInfo]);

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
      <CurrentDate />

      <Streaks number={streaks} />

      <Agenda />

      <Pomodoro />

      <TusTask tasksList={tasks} />

      <Habits habitsList={habits} />
    </div>
  );
}
