import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import ToastProvider from "@/components/Provider/ToastProvider";

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
  return (
    <html lang="en">
      <body className={`${poppinsSans.variable} antialiased`}>
        {" "}
        <ToastProvider>
          <main className="flex w-screen min-h-screen h-full flex-1">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
