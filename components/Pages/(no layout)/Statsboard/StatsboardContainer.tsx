"use client";

import { useState, useMemo } from "react";
import { KpiCards } from "./StatsboardContainer/kpi-cards";
import { TasksOverview } from "./StatsboardContainer/tasks-overview";
import { HabitsOverview } from "./StatsboardContainer/habits-overview";
import { UserActivity } from "./StatsboardContainer/user-activity";
import { DailyTrends } from "./StatsboardContainer/daily-trends";
import { TopUsers } from "./StatsboardContainer/top-users";
import { UserSelector } from "./StatsboardContainer/user-selector";

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
    <iframe
      style={{
        backgroundColor: "#21313C",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        width: "100vw",
        height: "100vh",
      }}
      src="https://charts.mongodb.com/charts-sherapp-vqxoqzx/embed/dashboards?id=9c2308bd-233a-4f75-9eea-a9b9ca1d423b&filter=%7B%22username%22%3A%7B%22%24nin%22%3A%5B%22albocoki%22%2C%22AliciaMoral%20Gallego%22%2C%22allanboussemart.734%22%2C%22anitabadillo%22%2C%22Bobito%22%2C%22Bramvan%20Oijen%22%2C%22carlos%40inkup.io%22%2C%22zn.ana22%22%2C%22cllopez%22%2C%22cllopez14%22%2C%22EduardoPertierra%22%2C%22FranSalvatierra%22%2C%22ftdev42%22%2C%22juanandres%22%2C%22juanandubb%22%2C%22MatiSargo%22%2C%22Matisargo%22%2C%22sarguensargo%22%2C%22sherp.918%22%2C%22test.493%22%2C%22mati%20test%22%5D%7D%7D&theme=dark&autoRefresh=true&maxDataAge=14400&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=scale"
    ></iframe>
  );

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
