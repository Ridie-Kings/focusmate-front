import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { isSameDay } from "date-fns";

const TOUR_STEPS = [
  {
    element: "#date-component",
    popover: {
      title: "Fecha Actual",
      description:
        "Muestra la fecha de hoy y te ayuda a seguir tu progreso diario",
    },
  },
  {
    element: "#streaks-component",
    popover: {
      title: "Rachas",
      description: "Sigue tus días consecutivos completando tareas y hábitos",
    },
  },
  {
    element: "#agenda-component",
    popover: {
      title: "Agenda",
      description: "Ver y gestionar tu horario diario",
    },
  },
  {
    element: "#agenda-component #small-calendar-component",
    popover: {
      title: "Calendario Pequeño",
      description: "Ver tu horario diario",
    },
  },
  {
    element: "#agenda-component #timeline-component",
    popover: {
      title: "Línea de Tiempo",
      description: "Ver tu horario diario",
    },
  },
  {
    element: "#pomodoro-component",
    popover: {
      title: "Temporizador Pomodoro",
      description: "Usa la técnica Pomodoro para aumentar tu productividad",
    },
  },
  {
    element: "#pomodoro-component #nav-component",
    popover: {
      title: "Navegación",
      description: "Navega por el temporizador Pomodoro",
    },
  },
  {
    element: "#pomodoro-component #timer-component",
    popover: {
      title: "Temporizador",
      description: "Visualiza el tiempo restante del pomodoro actual",
    },
  },
  {
    element: "#pomodoro-component #add-task-component",
    popover: {
      title: "Añadir Tarea",
      description: "Añade una tarea al temporizador",
    },
  },
  {
    element: "#pomodoro-component #commands-component",
    popover: {
      title: "Comandos",
      description: "Inicia, pausa y reinicia el temporizador",
    },
  },
  {
    element: "#pomodoro-component #settings",
    popover: {
      title: "Configuración",
      description: "Cambia la configuración del temporizador",
    },
  },
  {
    element: "#tasks-component",
    popover: {
      title: "Tareas",
      description: "Gestiona tus tareas y pendientes diarios",
    },
  },
  {
    element: "#habits-component",
    popover: {
      title: "Hábitos",
      description: "Sigue y construye tus hábitos diarios",
    },
  },
  {
    element: "#redirect",
    popover: {
      title: "Redirección",
      description: "Redirigir al la pagina seleccionada",
    },
  },
];

export const useTour = (userInfo: any) => {
  useEffect(() => {
    if (!userInfo?.createdAt) return;

    const hasCompletedTour = localStorage.getItem("tourCompleted");
    const userCreatedAt = new Date(userInfo?.createdAt);
    const today = new Date();

    if (!hasCompletedTour && userCreatedAt && isSameDay(userCreatedAt, today)) {
      const driverObj = driver({
        showProgress: true,
        steps: TOUR_STEPS,
        onDestroyStarted: () => {
          driverObj.destroy();
          localStorage.setItem("tourCompleted", "true");
        },
      });

      driverObj.drive();
    }
  }, [userInfo]);
};
