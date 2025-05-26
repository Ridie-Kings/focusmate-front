"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/Provider/ToastProvider";
import Button from "@/components/Reusable/Button";
import { X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { addToast } = useToast();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

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

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    setDeferredPrompt(null);

    if (outcome === "accepted") {
      addToast({
        type: "success",
        message: "¡Gracias por instalar SherpApp!",
      });
    }
  };

  if (isInstalled || !deferredPrompt || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border border-emerald-200">
      <div className="flex justify-between items-center mb-2 gap-2">
        <p className="text-sm text-gray-600">
          Instala SherpApp para una mejor experiencia
        </p>
        <X className="cursor-pointer" onClick={() => setIsVisible(false)} />
      </div>
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
