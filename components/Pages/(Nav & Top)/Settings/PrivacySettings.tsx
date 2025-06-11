import Switch from "@/components/Reusable/Switch";
import { useToastStore } from "@/stores/toastStore";
import { Clock, User } from "lucide-react";
import { useState } from "react";

export default function PrivacySettings() {
  const { addToast } = useToastStore();
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    activityStatus: true,
  });

  const handlePrivacyChange = (type: keyof typeof privacy) => {
    setPrivacy((prev) => ({
      ...prev,
      [type]:
        type === "profileVisibility"
          ? prev[type] === "public"
            ? "private"
            : "public"
          : !prev[type],
    }));
    addToast({
      type: "success",
      message: "Configuración de privacidad actualizada",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Configuración de Privacidad</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl text-secondary-600 border border-secondary-600">
            <div className="flex items-center gap-3">
              <User size={20} />
              <span>Visibilidad del Perfil</span>
            </div>
            <Switch
              value={privacy.profileVisibility === "public"}
              onChange={() => handlePrivacyChange("profileVisibility")}
            />
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl text-secondary-600 border border-secondary-600">
            <div className="flex items-center gap-3">
              <Clock size={20} />
              <span>Estado de Actividad</span>
            </div>
            <Switch
              value={privacy.activityStatus}
              onChange={() => handlePrivacyChange("activityStatus")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
