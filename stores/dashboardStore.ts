import { create } from "zustand";
import { TaskType } from "@/interfaces/Task/TaskType";
import { HabitsType } from "@/interfaces/Habits/HabitsType";
import { Dispatch, SetStateAction } from "react";
import { createTask } from "@/services/Task/createTask";
import { updateTask } from "@/services/Task/updateTask";
import { tempEventType, tempTaskType } from "@/interfaces/Modal/ModalType";
import { createHabit } from "@/services/Habits/createHabit";
import { updateHabit } from "@/services/Habits/updateHabit";
import { deleteHabit } from "@/services/Habits/deleteHabit";
import { createEvent } from "@/services/Calendar/createEvent";
import { EventType } from "@/interfaces/Calendar/EventType";
import { updateEvent } from "@/services/Calendar/updateEvent";
import { deleteEvent } from "@/services/Calendar/deleteEvent";
import { CalendarType } from "@/interfaces/Calendar/CalendarType";
import { deleteTask } from "@/services/Task/deleteTask";
import { addTaskToCalendar } from "@/services/Calendar/addTaskToCalendar";

type ApiResponse<T> = { success: boolean; res: T | string };

export interface DashboardStore {
  calendar: CalendarType;
  tasks: TaskType[];
  habits: HabitsType[];
  loading: {
    tasks: boolean;
    habits: boolean;
    calendar: boolean;
  };
  actions: {
    setCalendar: Dispatch<SetStateAction<CalendarType>>;
    addEvent: (event: tempEventType) => Promise<ApiResponse<EventType>>;
    removeEvent: (eventId: string) => Promise<ApiResponse<string>>;
    updateEvent: (
      eventId: string,
      updatedEvent: Partial<EventType>
    ) => Promise<ApiResponse<EventType>>;

    setTasks: Dispatch<SetStateAction<TaskType[]>>;
    addTask: (
      task: tempTaskType,
      addToCalendar?: boolean
    ) => Promise<ApiResponse<TaskType>>;
    removeTask: (taskId: string) => Promise<ApiResponse<string>>;
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

const validateTask = (
  task: tempTaskType,
  addTaskToCalendar?: boolean
): string => {
  if (!task.title.trim()) return "El título es obligatorio";

  if (addTaskToCalendar && !task.dueDate) {
    return "La fecha de finalización es obligatoria";
  }

  if (task.dueDate && task.startDate && task.dueDate <= task.startDate)
    return "La hora de finalización debe ser posterior a la hora de inicio";
  return "";
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  calendar: {
    events: [],
    tasks: [],
  },
  tasks: [],
  habits: [],
  loading: {
    tasks: true,
    habits: true,
    calendar: true,
  },

  actions: {
    setCalendar: (newCalendar) =>
      set((state) => ({
        calendar:
          typeof newCalendar === "function"
            ? newCalendar(state.calendar)
            : newCalendar,
      })),
    addEvent: async (newEvent) => {
      try {
        const res = await createEvent({ event: newEvent });
        if (!res.success)
          return handleApiError(res.res, "Error al crear la tarea");

        set((state) => ({
          calendar: {
            ...state.calendar,
            events: [...state.calendar.events, res.res],
          },
        }));

        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al crear la tarea");
      }
    },

    removeEvent: async (eventId) => {
      try {
        const res = await deleteEvent({ _id: eventId });
        if (!res.success)
          return handleApiError(res.res, "Error al eliminar el evento");

        set((state) => ({
          calendar: {
            ...state.calendar,
            events: state.calendar.events.filter(
              (event) => event._id !== eventId
            ),
          },
        }));

        return { success: true, res: "Evento eliminado correctamente" };
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
        return handleApiError(error, "Error al eliminar el evento");
      }
    },

    updateEvent: async (eventId, updatedEvent) => {
      try {
        const res = await updateEvent({
          _id: eventId,
          event: {
            title: updatedEvent.title,
            description: updatedEvent.description,
            startDate: updatedEvent.startDate,
            endDate: updatedEvent.endDate,
            category: updatedEvent.category || "default",
            color: updatedEvent.color || "#000000",
          },
        });

        if (!res.success)
          return handleApiError(res.res, "Error al actualizar la tarea");

        set((state) => ({
          calendar: {
            ...state.calendar,
            events: state.calendar.events.map((event) =>
              event._id === eventId ? res.res : event
            ),
          },
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

    addTask: async (newTask, addToCalendar) => {
      try {
        const error = validateTask(newTask, addToCalendar);
        if (error) return { success: false, res: error };

        const res = await createTask({ task: newTask });

        if (!res.success)
          return handleApiError(res.res, "Error al crear la tarea");

        set((state) => ({ tasks: [...state.tasks, res.res] }));

        if (addToCalendar) {
          const response = await addTaskToCalendar({ _id: res.res._id });

          if (!response.success)
            return handleApiError(
              response.res,
              "Error al agregar la tarea a la agenda"
            );

          set((state) => ({
            calendar: {
              ...state.calendar,
              tasks: [...state.calendar.tasks, res.res],
            },
          }));
        }

        return { success: true, res: res.res };
      } catch (error) {
        return handleApiError(error, "Error al crear la tarea");
      }
    },

    removeTask: async (taskId) => {
      try {
        const res = await deleteTask({ _id: taskId });
        if (!res.success)
          return handleApiError(res.res, "Error al eliminar la tarea");

        set((state) => ({
          calendar: {
            ...state.calendar,
            tasks: state.calendar.tasks.filter((task) => task._id !== taskId),
          },
          tasks: state.tasks.filter((task) => task._id !== taskId),
        }));
        return { success: true, res: "Tarea eliminada correctamente" };
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        return handleApiError(error, "Error al eliminar la tarea");
      }
    },

    updateTask: async (taskId, updatedTask) => {
      try {
        const res = await updateTask({
          _id: taskId,
          task: {
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
            startDate: updatedTask.startDate,
            endDate: updatedTask.endDate,
            dueDate: updatedTask.dueDate,
            priority: updatedTask.priority,
            color: updatedTask.color,
            category: updatedTask.category || "default",
          },
        });
        if (!res.success)
          return handleApiError(res.res, "Error al actualizar la tarea");

        set((state) => ({
          calendar: {
            ...state.calendar,
            tasks: state.calendar.tasks.map((task) =>
              task._id === taskId ? res.res : task
            ),
          },
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

export const useCalendar = () => useDashboardStore((state) => state.calendar);
export const useTasks = () => useDashboardStore((state) => state.tasks);
export const useHabits = () => useDashboardStore((state) => state.habits);
export const useLoadingTask = () =>
  useDashboardStore((state) => state.loading.tasks);
export const useLoadingHabits = () =>
  useDashboardStore((state) => state.loading.habits);
export const useLoadingCalendar = () =>
  useDashboardStore((state) => state.loading.calendar);
