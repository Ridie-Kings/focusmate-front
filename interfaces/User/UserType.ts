export type UserType = {
  createdAt: Date;
  email: string;
  phoneNumber: number | null;
  birthDate: Date | null;
  fullname: string;
  password: string;
  refreshtoken: string;
  updatedAt: Date;
  username: string;
  role: "user" | "admin";
  _id: string;
};

export type UserLogsType = {
  EventsCalendarCreated: number;
  EventsCalendarDeleted: number;
  bestStreak: number;
  createdAt: string;
  habitCompleted: number;
  habitCounts: number;
  habitDeleted: number;
  lastEmailChange: string;
  lastLogin: string;
  lastPasswordChange: string;
  lastProfileUpdate: string;
  lastSessionDuration: number;
  lastUpdate: string;
  loginCount: number;
  pomodoroCompleted: number;
  pomodoroCreated: number;
  pomodoroFinished: number;
  pomodoroStarted: number;
  registerTime: string;
  streak: number;
  taskCalendarCreated: number;
  taskCompleted: number;
  taskCounts: number;
  taskDeleted: number;
  totalProfileUpdate: number;
  totalSessionDuration: number;
  updatedAt: string;
  userId: string;
  _id: string;
};

export type UserLogStats = {
  Login: {
    registerTime: Date;
    lastLogin: Date;
  };
  Streak: {
    currentStreak: number;
    bestStreak: number;
  };
  Tasks: {
    totalTasks: number;
    totalActualTasks: number;
    completedTasks: number;
    pendingTasks: number;
    droppedTasks: number;
  };
  Habits: {
    activeHabits: number;
    completedHabits: {
      month: number;
      completedDate: number[];
    };
  };
  Events: {
    totalEvents: number;
    totalActualEvents: number;
    spendTimeEvents: number;
  };
  Pomodoros: {
    totalPomodoros: number;
    totalActualPomodoros: number;
    completedPomodoros: number;
    completedPausedPomodoros: number;
    droppedPomodoros: number;
    mediumInterruptions: number;
    PomodoroWithoutInterruptions: number;
    totalInterruptions: number;
    totalTimeDone: number;
    totalTimePlanned: number;
  };
  Calendar: {
    totalEvents: number;
    totalTasks: number;
    percentageTasks: number;
  };
};
