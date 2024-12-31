import TaskElement from "@/components/Elements/Task/TaskElement";

type TaskType = {
  id: number;
  title: string;
  description: string;
  status: "pendiente" | "en progreso" | "completado";
  priority: "alta" | "media" | "baja";
  dueDate: string;
};

const pendientes: TaskType[] = [
  {
    id: 1,
    title: "Comprar ingredientes para la cena",
    description: "Lista de ingredientes: pasta, tomate, queso.",
    status: "pendiente",
    priority: "alta",
    dueDate: "2024-12-27",
  },
  {
    id: 3,
    title: "Estudiar lenguaje C",
    description: "Revisar apuntes y practicar ejercicios básicos.",
    status: "pendiente",
    priority: "alta",
    dueDate: "2024-12-30",
  },
];
const enProgreso: TaskType[] = [
  {
    id: 2,
    title: "Enviar reporte semanal",
    description: "Enviar el reporte al jefe antes de las 5 PM.",
    status: "en progreso",
    priority: "media",
    dueDate: "2024-12-29",
  },
];

const enRevision: TaskType[] = [];
const noCompletados: TaskType[] = [];
const completados: TaskType[] = [
  {
    id: 4,
    title: "Actualizar portafolio",
    description: "Agregar nuevos proyectos desarrollados con Next.js.",
    status: "completado",
    priority: "baja",
    dueDate: "2024-12-25",
  },
];

export default function Task() {
  const Task = [
    "Pendientes",
    "En Progreso",
    "En Revision",
    "Completados",
    "No Completados",
  ];

  const renderTask: (task: string) => TaskType[] = (task: string) => {
    switch (task) {
      case "Pendientes":
        return pendientes;
      case "En Progreso":
        return enProgreso;
      case "En Revision":
        return enRevision;
      case "No Completados":
        return noCompletados;
      case "Completados":
        return completados;
      default:
        return [];
    }
  };
  return (
    <main className="p-4 flex">
      <ul className="flex w-full gap-3 place-content-between">
        {Task.map((items) => (
          <TaskElement key={items} items={renderTask(items)} title={items} />
        ))}
      </ul>
    </main>
  );
}
