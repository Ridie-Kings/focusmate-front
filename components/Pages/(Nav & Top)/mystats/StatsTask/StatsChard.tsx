import { BarChart } from "lucide-react";
import {
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// interface MonthlyStatsData {
//   date: string;
//   tasksCreated: number;
//   tasksCompleted: number;
//   habitsCreated: number;
//   pomodorosStarted: number;
// }

export default function StatsChard() {
  // const [dailyStats, setDailyStats] = useState<MonthlyStatsData[]>([]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
      // data={chartData}
      // margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tasksCreated" name="Tareas Creadas" fill="#8884d8" />
        <Bar
          dataKey="tasksCompleted"
          name="Tareas Completadas"
          fill="#82ca9d"
        />
        <Bar
          dataKey="pomodorosStarted"
          name="Pomodoros Iniciados"
          fill="#ffc658"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
