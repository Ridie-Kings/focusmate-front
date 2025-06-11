import { Languages } from "lucide-react";
import { useState } from "react";
import LanguageUtils from "@/lib/languageUtils";
import { useLocale } from "next-intl";

export default function GeneralSettings() {
  const locale = useLocale();
  const { handleSwitch } = LanguageUtils();
  const [language, setLanguage] = useState(locale);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    handleSwitch();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Idioma y Región</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <Languages size={16} />
            Idioma
          </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="p-2 border rounded-lg"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </div>
  );
}
