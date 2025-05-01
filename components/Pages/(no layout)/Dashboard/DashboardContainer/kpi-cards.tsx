"use client";

import { useState, useEffect } from "react";
import { Clock, CheckSquare, Calendar, Activity } from "lucide-react";

interface KpiCardsProps {
	selectedUser?: string;
}

interface KpiData {
	totalUsers: number;
	totalTasks: number;
	completedTasks: number;
	completionRate: string;
	totalHabits: number;
	totalPomodoros: number;
	completedPomodoros: number;
}

export function KpiCards({ selectedUser }: KpiCardsProps) {
	const [kpiData, setKpiData] = useState<KpiData>({
		totalUsers: 0,
		totalTasks: 0,
		completedTasks: 0,
		completionRate: "0%",
		totalHabits: 0,
		totalPomodoros: 0,
		completedPomodoros: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadKpiData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch("/api/v0/dashboard/global");

				if (!response.ok) {
					throw new Error(`Error en la API: ${response.status}`);
				}

				const data = await response.json();

				setKpiData({
					totalUsers: data.summary.totalUsers,
					totalTasks: data.summary.totalTasks,
					completedTasks: data.summary.completedTasks,
					completionRate: data.summary.completionRate,
					totalHabits: data.summary.totalHabits,
					totalPomodoros: data.summary.totalPomodoros,
					completedPomodoros: data.summary.completedPomodoros,
				});

				console.log("Datos cargados:", data);
			} catch (error) {
				console.error("Error loading KPI data:", error);
				setError(
					error instanceof Error ? error.message : "Error desconocido"
				);
			} finally {
				setIsLoading(false);
			}
		};

		loadKpiData();
	}, [selectedUser]);

	if (error) {
		return (
			<div className="p-4 bg-red-50 text-red-600 rounded-lg">
				Error al cargar datos: {error}
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div className="bg-white rounded-lg shadow p-4">
				<div className="flex flex-row items-center justify-between pb-2">
					<span className="text-sm font-medium">
						Usuarios Activos
					</span>
					<Activity className="h-4 w-4 text-muted-foreground" />
				</div>
				<div className="text-2xl font-bold">
					{isLoading ? "..." : kpiData.totalUsers}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					En el período seleccionado
				</p>
			</div>

			<div className="bg-white rounded-lg shadow p-4">
				<div className="flex flex-row items-center justify-between pb-2">
					<span className="text-sm font-medium">
						Pomodoros Usados
					</span>
					<Clock className="h-4 w-4 text-muted-foreground" />
				</div>
				<div className="text-2xl font-bold">
					{isLoading ? "..." : kpiData.totalPomodoros}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					Total de pomodoros completados
				</p>
			</div>

			<div className="bg-white rounded-lg shadow p-4">
				<div className="flex flex-row items-center justify-between pb-2">
					<span className="text-sm font-medium">
						Tareas Completadas
					</span>
					<CheckSquare className="h-4 w-4 text-muted-foreground" />
				</div>
				<div className="text-2xl font-bold">
					{isLoading ? "..." : kpiData.completedTasks}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					Total de tareas finalizadas
				</p>
			</div>

			<div className="bg-white rounded-lg shadow p-4">
				<div className="flex flex-row items-center justify-between pb-2">
					<span className="text-sm font-medium">Hábitos Activos</span>
					<Calendar className="h-4 w-4 text-muted-foreground" />
				</div>
				<div className="text-2xl font-bold">
					{isLoading ? "..." : kpiData.totalHabits}
				</div>
				<p className="text-xs text-muted-foreground mt-1">
					Hábitos en seguimiento
				</p>
			</div>
		</div>
	);
}
