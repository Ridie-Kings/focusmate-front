// "use client";
// import { useEffect, useState } from "react";

// import HabitsTracker from "@/components/Pages/(Nav & Top)/Habits/HabitsTracker";
// import ListHabits from "@/components/Pages/(Nav & Top)/Habits/ListHabits";
// import { HabitsType } from "@/interfaces/Habits/HabitsType";
import Prox from "@/components/Elements/Prox/Prox";

// const initialItems: HabitsType[] = [
//   {
//     _id: "1",
//     name: "Estudio",
//     type: "study",
//     status: false,
//     description: "9:30PM",
//     bestStreak: 5,
//     completedDates: [new Date("2023-10-01"), new Date("2023-10-02")],
//     createdAt: new Date("2023-09-01"),
//     frequency: "daily",
//     lastCompletedDate: undefined,
//     streak: 0,
//     userId: "user1",
//   },
//   {
//     _id: "2",
//     name: "Comida",
//     type: "food",
//     status: false,
//     description: "9:30PM",
//     bestStreak: 3,
//     completedDates: [new Date("2023-10-01")],
//     createdAt: new Date("2023-09-01"),
//     frequency: "daily",
//     lastCompletedDate: new Date("2023-10-01"),
//     streak: 1,
//     userId: "user1",
//   },
//   {
//     _id: "3",
//     name: "Dormir",
//     type: "sleep",
//     status: true,
//     description: "9:30PM",
//     bestStreak: 7,
//     completedDates: [
//       new Date("2023-10-01"),
//       new Date("2023-10-02"),
//       new Date("2023-10-03"),
//     ],
//     createdAt: new Date("2023-09-01"),
//     frequency: "daily",
//     lastCompletedDate: new Date("2023-10-03"),
//     streak: 3,
//     userId: "user1",
//   },
//   {
//     _id: "4",
//     name: "Caminar",
//     type: "sport",
//     status: false,
//     description: "9:30PM",
//     bestStreak: 2,
//     completedDates: [new Date("2023-10-01")],
//     createdAt: new Date("2023-09-01"),
//     frequency: "weekly",
//     lastCompletedDate: new Date("2023-10-01"),
//     streak: 1,
//     userId: "user1",
//   },
// ];

export default function Habits() {
  // const [habits, setHabits] = useState<HabitsType[]>(initialItems);
  // const [porcent, setPorcent] = useState(0);

  // useEffect(() => {
  //   const doneCount = habits.filter((habit) => habit.status).length;
  //   const percent = Math.round((doneCount / habits.length) * 100);
  //   setPorcent(percent);
  // }, [habits]);

  // const handleToggle = (id: string) => {
  //   setHabits((prev) =>
  //     prev.map((habit) =>
  //       habit._id === id ? { ...habit, done: !habit.status } : habit
  //     )
  //   );
  // };

  return (
    // <section className="flex flex-1">
    //   <HabitsTracker
    //     porcent={porcent}
    //     doneCount={habits.filter((h) => h.status).length}
    //     items={habits}
    //   />
    //   <ListHabits items={habits} setHabits={setHabits} />
    // </section>
    <Prox />
  );
}
