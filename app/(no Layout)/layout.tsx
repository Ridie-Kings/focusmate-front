import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Carousel from "@/components/Layouts/Marquee";
import PWAInstallPrompt from "@/components/Elements/General/PWAInstallPrompt";
import Modal from "@/components/Elements/General/Modal";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const poppinsSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SherpApp | Para que estudiar no sea cuesta arriba",
  manifest: "/manifest.json",
  description:
    "La herramienta de productividad diseñada para estudiantes y opositores que quieren organizar su estudio, medir su progreso y alcanzar sus metas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${poppinsSans.variable} antialiased`}>
        {" "}
        <NextIntlClientProvider>
          <main className="flex w-screen min-h-screen h-full flex-1">
            <Carousel />
            {children}
            <PWAInstallPrompt />
          </main>
          <Modal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
