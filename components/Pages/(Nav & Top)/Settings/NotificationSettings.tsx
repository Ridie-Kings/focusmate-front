import Switch from "@/components/Reusable/Switch";
import { useToastStore } from "@/stores/toastStore";
import { Bell, Volume2 } from "lucide-react";
import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sound: true,
    reminders: true,
    updates: false,
  });
  const { addToast } = useToastStore();

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    addToast({
      type: "success",
      message: "Configuración actualizada",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">
          Preferencias de Notificaciones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 rounded-xl text-secondary-600 border border-secondary-600"
            >
              <div className="flex items-center gap-3">
                {key === "sound" ? <Volume2 size={20} /> : <Bell size={20} />}
                <span className="capitalize">{key}</span>
              </div>
              <Switch
                value={value}
                onChange={() =>
                  handleNotificationChange(key as keyof typeof notifications)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
