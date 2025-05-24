"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Provider/ToastProvider";
import Button from "@/components/Reusable/Button";

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for the appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      addToast({
        type: "success",
        message: "¡SherpApp ha sido instalada correctamente!",
      });
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [addToast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Clear the deferredPrompt
    setDeferredPrompt(null);

    if (outcome === "accepted") {
      addToast({
        type: "success",
        message: "¡Gracias por instalar SherpApp!",
      });
    }
  };

  if (isInstalled || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-emerald-200">
      <p className="text-sm text-gray-600 mb-2">
        Instala SherpApp para una mejor experiencia
      </p>
      <Button
        type="button"
        button="primary"
        size="compact"
        onClick={handleInstallClick}
      >
        Instalar App
      </Button>
    </div>
  );
}
