import TareasElement from "../Elements/Tareas/TareasElement";

type tareasType = {
  id: number;
  title: string;
  description: string;
  status: "pendiente" | "en progreso" | "completado";
  priority: "alta" | "media" | "baja";
  dueDate: string;
};

const pendientes: tareasType[] = [
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
const enProgreso: tareasType[] = [
  {
    id: 2,
    title: "Enviar reporte semanal",
    description: "Enviar el reporte al jefe antes de las 5 PM.",
    status: "en progreso",
    priority: "media",
    dueDate: "2024-12-29",
  },
];

const enRevision: tareasType[] = [];
const noCompletados: tareasType[] = [];
const completados: tareasType[] = [
  {
    id: 4,
    title: "Actualizar portafolio",
    description: "Agregar nuevos proyectos desarrollados con Next.js.",
    status: "completado",
    priority: "baja",
    dueDate: "2024-12-25",
  },
];

export default function Tareas() {
  const tareas = [
    "Pendientes",
    "En Progreso",
    "En Revision",
    "Completados",
    "No Completados",
  ];

  const renderTareas: (tarea: string) => tareasType[] = (tarea: string) => {
    switch (tarea) {
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
        {tareas.map((items) => (
          <TareasElement
            key={items}
            items={renderTareas(items)}
            title={items}
          />
        ))}
      </ul>
    </main>
  );
}
