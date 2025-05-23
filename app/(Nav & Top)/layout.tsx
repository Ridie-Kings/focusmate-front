import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/Layouts/NavBar";
import TopBar from "@/components/Layouts/TopBar";
import TimerProvider from "@/components/Provider/TimerProvider";
import { getToken } from "@/lib";
import ModalProvider from "@/components/Provider/ModalProvider";
import DashboardProvider from "@/components/Provider/DashboardProvider";
import { redirect } from "next/navigation";
import { SocketIOProvider } from "@/components/Provider/WebsocketProvider";
import PopUp from "@/components/Elements/General/PopUp";
import Script from "next/script";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script id="hotjar-tracking" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6381926,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body className={`${poppinsSans.variable} antialiased`}>
        {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > */}
        <SocketIOProvider token={token ?? ""}>
          <DashboardProvider>
            <ModalProvider>
              <ToastProvider>
                <TimerProvider>
                  <NavBar />
                  <main className="flex flex-col min-h-screen md:w-auto w-screen h-full flex-1">
                    <TopBar />
                    {children}
                    <PopUp />
                  </main>
                </TimerProvider>
              </ToastProvider>
            </ModalProvider>
          </DashboardProvider>
        </SocketIOProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
