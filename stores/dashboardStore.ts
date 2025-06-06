import { create } from "zustand";
import { TaskType } from "@/interfaces/Task/TaskType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { Dispatch, SetStateAction } from "react";
import { createTask } from "@/services/Task/createTask";
import { updateTask } from "@/services/Task/updateTask";
import { deleteTask } from "@/services/Task/deleteTask";
import { addHours } from "date-fns";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";
import { tempTaskType } from "@/interfaces/Modal/ModalType";
import { createHabit } from "@/services/Habits/createHabit";
import { updateHabit } from "@/services/Habits/updateHabit";
import { deleteHabit } from "@/services/Habits/deleteHabit";

type ApiResponse<T> = { success: boolean; res: T | string };

interface DashboardStore {
  events: TaskType[];
  tasks: TaskType[];
  habits: HabitsType[];
  loading: {
    events: boolean;
    tasks: boolean;
    habits: boolean;
  };
  actions: {
    setEvents: Dispatch<SetStateAction<TaskType[]>>;
    addEvent: (event: tempTaskType) => Promise<ApiResponse<TaskType>>;
    removeEvent: (eventId: string) => Promise<ApiResponse<string>>;
    updateEvent: (
      eventId: string,
      updatedEvent: Partial<TaskType>
    ) => Promise<ApiResponse<TaskType>>;

    setTasks: Dispatch<SetStateAction<TaskType[]>>;
    addTask: (task: tempTaskType) => Promise<ApiResponse<TaskType>>;
    removeTask: (taskId: string) => void;
    updateTask: (
      taskId: string,
      updatedTask: Partial<TaskType>
    ) => Promise<ApiResponse<TaskType>>;

    setHabits: Dispatch<SetStateAction<HabitsType[]>>;
    addHabit: (habit: HabitsType) => Promise<ApiResponse<HabitsType>>;
    removeHabit: (habitId: string) => Promise<ApiResponse<string>>;
    updateHabit: (
      habitId: string,
      updatedHabit: Partial<HabitsType>
    ) => Promise<ApiResponse<HabitsType>>;

    setLoading: (key: keyof DashboardStore["loading"], value: boolean) => void;
  };
}

const handleApiError = (
  error: unknown,
  message: string
): ApiResponse<never> => ({
  success: false,
  res: typeof error === "string" ? error : message,
});

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  events: [],
  tasks: [],
  habits: [],
  loading: {
    events: true,
    tasks: true,
    habits: true,
  },

  actions: {
    setEvents: (newEvents) =>
      set((state) => ({
        events:
          typeof newEvents === "function" ? newEvents(state.events) : newEvents,
      })),

    addEvent: async (newEvent) => {
      try {
        const task = {
          ...newEvent,
          dueDate: addHours(
            newEvent.dueDate ?? new Date(),
            -(newEvent.dueDate?.getTimezoneOffset() ?? 0) / 60
          ),
        };

        const res = await createTask({ task });
        if (!res.success)
          return handleApiError(res.res, "Error al crear la tarea");

        set((state) => ({
          events: [...state.events, res.res],
          tasks: [...state.tasks, res.res],
        }));

        const calendarResponse = await addTaskToCalendar({ _id: res.res._id });
        if (!calendarResponse.success) {
          set((state) => ({
            events: state.events.filter((event) => event._id !== res.res._id),
            tasks: state.tasks.filter((task) => task._id !== res.res._id),
          }));
          return handleApiError(
            calendarResponse.res,
            "Error al añadir la tarea al calendario"
          );
        }

        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al crear la tarea");
      }
    },

    removeEvent: async (eventId) => {
      try {
        const res = await deleteTask({ _id: eventId });
        if (!res.success)
          return handleApiError(res.res, "Error al eliminar la tarea");

        set((state) => ({
          events: state.events.filter((event) => event._id !== eventId),
          tasks: state.tasks.filter((task) => task._id !== eventId),
        }));

        return { success: true, res: "Tarea eliminada correctamente" };
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        return handleApiError(error, "Error al eliminar la tarea");
      }
    },

    updateEvent: async (eventId, updatedEvent) => {
      try {
        const res = await updateTask({
          _id: eventId,
          task: {
            title: updatedEvent.title,
            description: updatedEvent.description,
            status: updatedEvent.status,
            startDate: updatedEvent.startDate,
            endDate: updatedEvent.endDate,
            dueDate: updatedEvent.dueDate,
            priority: updatedEvent.priority,
            color: updatedEvent.color,
            category: updatedEvent.category || "default",
          },
        });

        if (!res.success)
          return handleApiError(res.res, "Error al actualizar la tarea");

        set((state) => ({
          events: state.events.map((event) =>
            event._id === eventId ? res.res : event
          ),
          tasks: state.tasks.map((task) =>
            task._id === eventId ? res.res : task
          ),
        }));

        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al actualizar la tarea");
      }
    },

    setTasks: (newTasks) =>
      set((state) => ({
        tasks:
          typeof newTasks === "function" ? newTasks(state.tasks) : newTasks,
      })),

    addTask: async (newTask) => {
      try {
        const res = await createTask({ task: newTask });
        if (!res.success)
          return handleApiError(res.res, "Error al crear la tarea");

        set((state) => ({ tasks: [...state.tasks, res.res] }));
        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al crear la tarea");
      }
    },

    removeTask: (taskId) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== taskId),
      })),

    updateTask: async (taskId, updatedTask) => {
      try {
        const res = await updateTask({ _id: taskId, task: updatedTask });
        if (!res.success)
          return handleApiError(res.res, "Error al actualizar la tarea");

        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === taskId ? res.res : task
          ),
        }));

        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al actualizar la tarea");
      }
    },

    setHabits: (newHabits) =>
      set((state) => ({
        habits:
          typeof newHabits === "function" ? newHabits(state.habits) : newHabits,
      })),

    addHabit: async (newHabit) => {
      try {
        const res = await createHabit({ habit: newHabit });
        if (!res.success)
          return handleApiError(res.res, "Error al crear el hábito");

        set((state) => ({ habits: [...state.habits, res.res as HabitsType] }));
        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al crear el hábito");
      }
    },

    removeHabit: async (habitId) => {
      try {
        const res = await deleteHabit({ _id: habitId });
        if (!res.success)
          return handleApiError(res.res, "Error al eliminar el hábito");

        set((state) => ({
          habits: state.habits.filter((habit) => habit._id !== habitId),
        }));

        return { success: true, res: "Hábito eliminado correctamente" };
      } catch (error) {
        console.error("Error al eliminar el hábito:", error);
        return handleApiError(error, "Error al eliminar el hábito");
      }
    },

    updateHabit: async (habitId, updatedHabit) => {
      try {
        const res = await updateHabit({ _id: habitId, habit: updatedHabit });
        if (!res.success)
          return handleApiError(res.res, "Error al actualizar el hábito");

        set((state) => ({
          habits: state.habits.map((habit) =>
            habit._id === habitId ? res.res : habit
          ),
        }));

        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al actualizar el hábito");
      }
    },

    setLoading: (key, value) =>
      set((state) => ({
        loading: { ...state.loading, [key]: value },
      })),
  },
}));

// Selectors
export const useEvents = () => useDashboardStore((state) => state.events);
export const useTasks = () => useDashboardStore((state) => state.tasks);
export const useHabits = () => useDashboardStore((state) => state.habits);
export const useLoadingEvents = () =>
  useDashboardStore((state) => state.loading.events);
export const useLoadingTask = () =>
  useDashboardStore((state) => state.loading.tasks);
export const useLoadingHabits = () =>
  useDashboardStore((state) => state.loading.habits);
