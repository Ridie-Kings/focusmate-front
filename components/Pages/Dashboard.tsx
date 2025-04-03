import Date from "@/components/Elements/General/CurrentDate";
import Animate from "@/components/Pages/Dashboard/Animate";
import Pomodoro from "../Elements/General/PomodoroComponent";
import Habits from "@/components/Pages/Dashboard/Habits";
import Agenda from "@/components/Pages/Dashboard/Agenda";
import TusTask from "@/components/Pages/Dashboard/YourTask";
import { TaskType } from "@/interfaces/Task/TaskType";

export default async function Dashboard() {
  const tasks: TaskType[] = [
    {
      userId: "user123",
      _id: "task001",
      title: "Finalize Project Proposal",
      description:
        "Complete the final draft of the Q2 project proposal document",
      status: "completed",
      priority: "high",
      isDeleted: false,
      tags: ["project", "documentation", "deadline"],
      category: "work",
      subTasks: [],
      dueDate: new Date("2025-04-15"),
    },
    {
      userId: "user123",
      _id: "task002",
      title: "Schedule Team Meeting",
      description: "Organize weekly team sync to discuss ongoing projects",
      status: "pending",
      priority: "medium",
      isDeleted: false,
      tags: ["meeting", "team", "weekly"],
      category: "work",
      subTasks: [],
      dueDate: new Date("2025-04-05"),
    },
    {
      userId: "user123",
      _id: "task003",
      title: "Grocery Shopping",
      description: "Buy ingredients for weekend dinner party",
      status: "dropped",
      priority: "low",
      isDeleted: false,
      tags: ["personal", "shopping"],
      category: "personal",
      subTasks: [],
      dueDate: new Date("2025-04-04"),
    },
  ];
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-9 gap-4 w-full h-full p-5">
      <Date />
      <Animate />
      <Pomodoro />
      <TusTask tasks={tasks} />
      <Habits />
      <Agenda />
    </div>
  );
}
