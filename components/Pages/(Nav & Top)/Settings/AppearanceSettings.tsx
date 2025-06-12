import Switch from "@/components/Reusable/Switch";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Tema y Apariencia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 rounded-xl text-secondary-600 border border-secondary-600">
            <div className="flex items-center gap-3">
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
              <span>Modo {theme === "light" ? "Claro" : "Oscuro"}</span>
            </div>
            <Switch
              value={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
