"use client";

import { ReactNode, useEffect, useState } from "react";
import { Bell, User, Shield, Palette, Zap } from "lucide-react";
import TemplateDashboard from "@/components/Elements/General/TemplateBox";
import GeneralSettings from "./Settings/GeneralSettings";
import NotificationSettings from "./Settings/NotificationSettings";
import AppearanceSettings from "./Settings/AppearanceSettings";
import PrivacySettings from "./Settings/PrivacySettings";
import AccountSettings from "./Settings/AccountSettings";
import NavSettings from "./Settings/NavSettings";

export type SettingSection =
  | "general"
  | "notifications"
  | "appearance"
  | "privacy"
  | "account";

export default function Settings() {
  const [activeSection, setActiveSection] = useState<SettingSection>(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("settingsSection") as SettingSection) || "general"
      );
    }
    return "general";
  });

  useEffect(() => {
    localStorage.setItem("settingsSection", activeSection);
  }, [activeSection]);

  const sections: { id: SettingSection; icon: ReactNode; label: string }[] = [
    { id: "general", icon: <Zap size={20} />, label: "General" },
    { id: "notifications", icon: <Bell size={20} />, label: "Notificaciones" },
    { id: "appearance", icon: <Palette size={20} />, label: "Apariencia" },
    { id: "privacy", icon: <Shield size={20} />, label: "Privacidad" },
    { id: "account", icon: <User size={20} />, label: "Cuenta" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return <GeneralSettings />;

      case "notifications":
        return <NotificationSettings />;

      case "appearance":
        return <AppearanceSettings />;

      case "privacy":
        return <PrivacySettings />;

      case "account":
        return <AccountSettings />;
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 125px)" }}
      className="flex flex-col md:flex-row gap-6 w-full h-full p-6"
    >
      <NavSettings
        setActiveSection={setActiveSection}
        activeSection={activeSection}
        sections={sections}
      />

      <div className="flex-1">
        <TemplateDashboard
          grid="col-span-1 h-full place-content-start"
          title={sections.find((s) => s.id === activeSection)?.id || ""}
        >
          {renderContent()}
        </TemplateDashboard>
      </div>
    </div>
  );
}
