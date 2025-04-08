export type HabitsType = {
  _id: number;
  bestStreak: number;
  completedDates: Date[];
  createdAt: Date;
  description: string;
  frequency: "daily" | "monthly" | "yearly";
  lastCompletedDate: Date | undefined;
  name: string;
  status: boolean;
  streak: number;
  userId: string;
};
