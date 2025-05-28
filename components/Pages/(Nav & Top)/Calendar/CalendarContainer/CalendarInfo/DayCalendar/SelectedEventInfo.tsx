import { Bell, LinkIcon, MapPin, Palette, Plus, User } from "lucide-react";
import { Clock } from "lucide-react";
import { TaskType } from "@/interfaces/Task/TaskType";
import { Pen } from "lucide-react";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import Menu from "@/components/Reusable/Menu";
import Image from "next/image";

const mockParticipants = [
  { name: "Alice", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Bob", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Charlie", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
];

export default function SelectedEventInfo({
  selectedEvent,
}: {
  selectedEvent: TaskType | null;
}) {
  return (
    <div
      className={`h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 flex-nowrap ${
        selectedEvent ? "w-1/3 p-6" : "w-0"
      }`}
    >
      {selectedEvent && (
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-gray-400 text-xs">Evento</div>
              <div className="text-primary-500 mb-2">{selectedEvent.title}</div>
            </div>
            <Menu
              items={[
                { label: "Modificar", icon: <Pen size={20} /> },
                { label: "Eliminar", icon: <Trash2 size={20} /> },
              ]}
            />
          </div>

          <div className="flex gap-8">
            <div>
              <div className="flex items-center gap-2 text-black">
                <Clock size={20} />
                <span>Comienza</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {format(selectedEvent.startDate, "HH:mm")}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-black">
                <Clock size={20} />
                <span>Finaliza</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {format(selectedEvent.endDate, "HH:mm")}{" "}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-black mb-1">
              <User size={20} />
              <span>Participantes</span>
            </div>
            <div className="flex items-center -space-x-2">
              {mockParticipants.map((p, i) => (
                <Image
                  key={i}
                  src={p.avatar}
                  alt={p.name}
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 -ml-2 first:ml-0"
                  width={48}
                  height={48}
                />
              ))}
              <button className="w-12 h-12 rounded-full border border-secondary-600 flex items-center justify-center text-secondary-600 bg-white">
                <Plus size={28} />
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-black mb-1">
              <MapPin size={20} />
              <span>Ubicación</span>
            </div>
            <div className="text-sm text-gray-400">
              {/* {selectedEvent.location || "San Rafael - Mendoza"} */}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-black mb-1">
              <MapPin size={20} />
              <span>Categoria</span>
            </div>
            <div className="text-sm text-gray-400">
              {selectedEvent.category || "No Categoria"}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-black mb-1">
              <Palette size={20} />
              <span>Color del Evento</span>
            </div>
            <span
              style={{ color: selectedEvent.color }}
              className="text-sm text-gray-400"
            >
              {selectedEvent.color}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-black mb-1">
              <LinkIcon size={20} />
              <span>Link</span>
            </div>
            <a
              // href={selectedEvent.link || "https://sherp-app.com/login"}
              className="text-sm text-gray-400 underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* {selectedEvent.link || "https://sherp-app.com/login"} */}
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2 text-black mb-1">
              <Bell size={20} />
              <span>Recordatorios</span>
            </div>
            <div className="text-sm text-gray-400">
              {/* {selectedEvent.reminder || "30 min. antes"} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
