import { KpiCards } from "./DashboardContainer/kpi-cards";

export default function DashboardContainer() {
	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center justify-between py-4">
					<h1 className="text-2xl font-bold">
						Dashboard de Análisis
					</h1>
					<div className="flex items-center gap-4"></div>
				</div>
			</header>

			<main className="container py-6">
				<KpiCards />
			</main>
		</div>
	);
}
