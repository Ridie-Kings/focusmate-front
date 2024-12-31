"use client";
import Date from "@/components/Elements/General/CurrentDate";
import Animate from "@/components/Elements/Dashboard/Animate";
import Pomodoro from "../Elements/Dashboard/Pomodoro";
import Habits from "../Elements/Dashboard/Habits";
import Agenda from "../Elements/Dashboard/Agenda";
import TusTask from "../Elements/Dashboard/YourTask";
import { motion } from "motion/react";

export default function Dashboard() {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.075,
        duration: 1,
      },
    }),
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 grid-rows-9 gap-4 w-full h-full p-5"
    >
      <Date itemVariants={itemVariants} />
      <Animate itemVariants={itemVariants} />
      <Pomodoro itemVariants={itemVariants} />
      <TusTask itemVariants={itemVariants} />
      <Habits itemVariants={itemVariants} />
      <Agenda itemVariants={itemVariants} />
    </motion.div>
  );
}
