"use client";

import { useState, useMemo } from "react";
import { KpiCards } from "./StatsboardContainer/kpi-cards";
import { TasksOverview } from "./StatsboardContainer/tasks-overview";
import { HabitsOverview } from "./StatsboardContainer/habits-overview";
import { UserActivity } from "./StatsboardContainer/user-activity";
import { DailyTrends } from "./StatsboardContainer/daily-trends";
import { TopUsers } from "./StatsboardContainer/top-users";
import { UserSelector } from "./StatsboardContainer/user-selector";

// Definición de pestañas para facilitar mantenimiento
const TABS = [
  { id: "overview", label: "Resumen" },
  { id: "tasks", label: "Tareas" },
  { id: "habits", label: "Hábitos" },
  { id: "activity", label: "Actividad" },
];

export default function StatsboardContainer() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const viewMode = useMemo(
    () => (selectedUser ? "personal" : "global"),
    [selectedUser]
  );

  const handleUserSelect = (userId: string | null) => {
    setSelectedUser(userId);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <KpiCards selectedUser={selectedUser} viewMode={viewMode} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyTrends selectedUser={selectedUser} viewMode={viewMode} />
              <TopUsers selectedUser={selectedUser} viewMode={viewMode} />
            </div>
          </>
        );
      case "tasks":
        return (
          <TasksOverview selectedUser={selectedUser} viewMode={viewMode} />
        );
      case "habits":
        return (
          <HabitsOverview selectedUser={selectedUser} viewMode={viewMode} />
        );
      case "activity":
        return <UserActivity selectedUser={selectedUser} viewMode={viewMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b px-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Dashboard de Análisis</h1>
          <UserSelector onUserSelect={handleUserSelect} />
        </div>
      </header>

      <main className="container w-full p-6">
        <div className="mb-6">
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-6">{renderActiveTabContent()}</div>
        </div>
      </main>
    </div>
  );
}
