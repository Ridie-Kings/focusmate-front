import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Layouts/NavBar";
import TopBar from "@/components/Layouts/TopBar";
import TimerProvider from "@/components/Provider/TimerProvider";
import { logout } from "@/lib";

const poppinsSans = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "SherpApp | Para que estudiar no sea cuesta arriba",
	description:
		"La herramienta de productividad diseñada para estudiantes y opositores que quieren organizar su estudio, medir su progreso y alcanzar sus metas.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const handleLogout = async () => {
		"use server";
		console.log("Logging out...");

		try {
			await logout();
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<html lang="en">
			<body className={`${poppinsSans.variable} antialiased`}>
				{" "}
				<TimerProvider>
					<NavBar handleLogout={handleLogout} />
					<main className="flex flex-col min-h-screen h-full flex-1">
						<TopBar />
						{children}
					</main>
				</TimerProvider>
			</body>
		</html>
	);
}
