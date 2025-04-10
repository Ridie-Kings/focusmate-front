import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Layouts/NavBar";
import TimerProvider from "@/components/Provider/TimerProvider";
import { getToken } from "@/lib";
import ModalProvider from "@/components/Provider/ModalProvider";
import { redirect } from "next/navigation";
// import { SocketIOProvider } from "@/components/Provider/WebsocketProvider";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  if (!token) redirect("/login");
  const handleLogout = async () => {
    "use server";
    // console.log("Logging out...");

    try {
      await logout();
    } catch (error) {
      if (
        error instanceof Error &&
        "response" in error &&
        error.response &&
        typeof error.response === "string"
      ) {
        console.error("Error logging out:", error.response);
      } else {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        {" "}
        {/* <SocketIOProvider token={token ?? ""}> */}
        <ModalProvider>
          <TimerProvider>
            <NavBar />
            <main className="flex flex-col min-h-screen h-full flex-1">
              {children}
            </main>
          </TimerProvider>
        </ModalProvider>
        {/* </SocketIOProvider> */}
      </body>
    </html>
  );
}
