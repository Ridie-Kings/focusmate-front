"use client";
import Date from "@/components/Elements/General/CurrentDate";
import Animate from "@/components/Elements/Dashboard/Animate";
import Pomodoro from "../Elements/General/PomodoroComponent";
import Habits from "../Elements/Dashboard/Habits";
import Agenda from "../Elements/Dashboard/Agenda";
import TusTask from "../Elements/Dashboard/YourTask";
import { easeInOut, motion } from "motion/react";

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 1,
      easeInOut,
    },
  }),
};
export default function Dashboard() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-9 gap-4 w-full h-full p-5"
    >
      <Date />
      <Animate />
      <Pomodoro />
      <TusTask />
      <Habits />
      <Agenda />
    </motion.div>
  );
}
