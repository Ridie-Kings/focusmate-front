export type HabitsType = {
  _id: string;
  bestStreak: number;
  completedDates: Date[];
  createdAt: Date;
  description: string;
  frequency: "daily" | "weekly" | "monthly";
  lastCompletedDate: Date | undefined;
  name: string;
  status: boolean;
  type: string;
  streak: number;
  userId: string;
};
