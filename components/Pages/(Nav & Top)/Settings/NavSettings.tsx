import { Dispatch, ReactNode, SetStateAction } from "react";
import { SettingSection } from "../Settings";

export default function NavSettings({
  setActiveSection,
  activeSection,
  sections,
}: {
  setActiveSection: Dispatch<SetStateAction<SettingSection>>;
  activeSection: SettingSection;
  sections: { id: SettingSection; icon: ReactNode; label: string }[];
}) {
  return (
    <div className="sticky top-6 w-full h-full md:w-64 flex flex-col gap-2 p-4 bg-primary-500 rounded-xl flex-shrink-0">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-secondary-600 ${
            activeSection === section.id
              ? "bg-primary-500 text-white"
              : "text-secondary-400"
          }`}
        >
          {section.icon}
          <span>{section.label}</span>
        </button>
      ))}
    </div>
  );
}
