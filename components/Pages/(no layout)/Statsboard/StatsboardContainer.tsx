"use client";

import { useState } from "react";
import { KpiCards } from "./StatsboardContainer/kpi-cards";
import { TasksOverview } from "./StatsboardContainer/tasks-overview";
import { HabitsOverview } from "./StatsboardContainer/habits-overview";
import { UserActivity } from "./StatsboardContainer/user-activity";
import { DailyTrends } from "./StatsboardContainer/daily-trends";
import { TopUsers } from "./StatsboardContainer/top-users";
import { UserSelector } from "./StatsboardContainer/user-selector";

export default function StatsboardContainer() {
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [viewMode, setViewMode] = useState<"personal" | "global">("global");
	const [activeTab, setActiveTab] = useState<string>("overview");

	const handleUserSelect = (userId: string | null) => {
		setSelectedUser(userId);
		setViewMode(userId ? "personal" : "global");
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between py-4">
					<h1 className="text-2xl font-bold">
						Dashboard de Análisis
					</h1>
					<div className="flex items-center gap-4">
						<UserSelector onUserSelect={handleUserSelect} />
					</div>
				</div>
			</header>

			<main className="container py-6">
				<div className="mb-6">
					{/* Custom Tabs Navigation */}
					<div className="flex space-x-1 rounded-lg bg-muted p-1">
						<button
							onClick={() => setActiveTab("overview")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								activeTab === "overview"
									? "bg-white text-primary-foreground shadow"
									: "text-muted-foreground hover:text-foreground hover:bg-background/80"
							}`}
						>
							Resumen
						</button>
						<button
							onClick={() => setActiveTab("tasks")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								activeTab === "tasks"
									? "bg-white text-primary-foreground shadow"
									: "text-muted-foreground hover:text-foreground hover:bg-background/80"
							}`}
						>
							Tareas
						</button>
						<button
							onClick={() => setActiveTab("habits")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								activeTab === "habits"
									? "bg-white text-primary-foreground shadow"
									: "text-muted-foreground hover:text-foreground hover:bg-background/80"
							}`}
						>
							Hábitos
						</button>
						<button
							onClick={() => setActiveTab("activity")}
							className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
								activeTab === "activity"
									? "bg-white text-primary-foreground shadow"
									: "text-muted-foreground hover:text-foreground hover:bg-background/80"
							}`}
						>
							Actividad
						</button>
					</div>

					<div className="mt-4">
						<div
							className={`space-y-6 ${
								activeTab === "overview" ? "block" : "hidden"
							}`}
						>
							<KpiCards
								selectedUser={selectedUser ?? undefined}
								viewMode={viewMode}
							/>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<DailyTrends
									selectedUser={selectedUser}
									viewMode={viewMode}
								/>
								<TopUsers
									selectedUser={selectedUser}
									viewMode={viewMode}
								/>
							</div>
						</div>

						<div
							className={`space-y-6 ${
								activeTab === "tasks" ? "block" : "hidden"
							}`}
						>
							<TasksOverview
								selectedUser={selectedUser}
								viewMode={viewMode}
							/>
						</div>

						<div
							className={`space-y-6 ${
								activeTab === "habits" ? "block" : "hidden"
							}`}
						>
							<HabitsOverview
								selectedUser={selectedUser}
								viewMode={viewMode}
							/>
						</div>

						<div
							className={`space-y-6 ${
								activeTab === "activity" ? "block" : "hidden"
							}`}
						>
							<UserActivity
								selectedUser={selectedUser}
								viewMode={viewMode}
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
