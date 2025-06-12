
export type EventType = {
  title: string;
  _id: string;
  description: string;
  location: string;
  category: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  isRecurringInstance: boolean;
  createdAt: Date;
  updatedAt: Date;
  duration: number;
  color: string;
  recurrence: {
    frequency: "none" | "daily" | "weekly" | "monthly";
    interval: number;
    daysOfWeek: number[];
    endDate: Date;
    maxOccurrences: number;
  };
};
