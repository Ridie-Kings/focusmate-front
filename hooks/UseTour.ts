import { useEffect } from "react";
import { driver } from "driver.js";
import { isSameDay } from "date-fns";

const TOUR_STEPS = [
  {
    element: "#date-component",
    popover: {
      title: "Current Date",
      description: "Shows today's date and helps you track your daily progress",
    },
  },
  {
    element: "#streaks-component",
    popover: {
      title: "Streaks",
      description: "Track your consecutive days of completing tasks and habits",
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
      description: "Use the Pomodoro technique to boost your productivity",
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
];

export const useTour = (userInfo: any) => {
  useEffect(() => {
    if (!userInfo?.createdAt) return;

    const hasCompletedTour = localStorage.getItem("tourCompleted");
    const userCreatedAt = new Date(userInfo?.createdAt);
    const today = new Date();

    if (!hasCompletedTour && userCreatedAt && isSameDay(userCreatedAt, today)) {
      const driverObj = driver({
        showProgress: true,
        steps: TOUR_STEPS,
        onDestroyStarted: () => {
          driverObj.destroy();
          localStorage.setItem("tourCompleted", "true");
        },
      });

      driverObj.drive();
    }
  }, [userInfo]);
};
