"use client";
import Button from "@/components/Reusable/Button";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { useState } from "react";

export default function ButtonSend({ profile }: { profile: ProfileType }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/send-intrest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: profile.user._id,
          email: profile.user.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
        setError(data.message || "Ocurrió un error al enviar el email");
      }
    } catch (err) {
      console.error("Error en la conexión:", err);
      setError("Error de conexión. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-10">
      <Button
        onClick={handleSend}
        button="primary"
        type="button"
        size="compact"
      >
        {isLoading ? "Enviando..." : "Estoy interesado"}
      </Button>

      {showMessage && (
        <div className="mt-2 text-green-600 text-sm">
          ¡Email enviado con éxito!
        </div>
      )}

      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  );
}
