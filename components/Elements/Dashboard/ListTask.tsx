import PriorityBadge from "../General/PriorityBadge";

export type taskType = {
  id: number;
  title: string;
  description: string;
  status: "pendiente" | "en progreso" | "completado";
  priority: "alta" | "media" | "baja";
  dueDate: string;
}[];

const pendientes: taskType = [
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
const enProgreso: taskType = [
  {
    id: 2,
    title: "Enviar reporte semanal",
    description: "Enviar el reporte al jefe antes de las 5 PM.",
    status: "en progreso",
    priority: "media",
    dueDate: "2024-12-29",
  },
];

const enRevision: taskType = [];
const noCompletados: taskType = [];
const completados: taskType = [
  {
    id: 4,
    title: "Actualizar portafolio",
    description: "Agregar nuevos proyectos desarrollados con Next.js.",
    status: "completado",
    priority: "baja",
    dueDate: "2024-12-25",
  },
];

export default function ListTask({ filter }: { filter: string }) {
  const getAllTasks = () => [
    ...pendientes,
    ...enProgreso,
    ...enRevision,
    ...noCompletados,
    ...completados,
  ];

  const render = () => {
    switch (filter) {
      case "Pendientes":
        return pendientes;
      case "En Progreso":
        return enProgreso;
      case "En Revisión":
        return enRevision;
      case "No Completados":
        return noCompletados;
      case "Completados":
        return completados;
      case "":
        return getAllTasks();
      default:
        return [];
    }
  };

  const tasks = render();

  return (
    <>
      <div className="flex flex-col w-full gap-4 h-[265px] overflow-auto">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task.id}
              className="flex gap-4 py-3 px-3 bg-[#D9D9D9] rounded-lg"
            >
              <div className="flex w-full items-center justify-between">
                <p>{task.title}</p>
                <PriorityBadge priority={task.priority} />
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No hay task disponibles.</p>
        )}
      </div>
      <button
        onClick={() => console.log("Agregar Task")}
        className="w-full bg-black py-2 rounded-full bg-black-100 text-white-100 text-lg"
      >
        Agregar Task
      </button>
    </>
  );
}
