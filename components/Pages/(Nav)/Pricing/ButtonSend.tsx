"use client";
import Button from "@/components/Reusable/Button";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { useState } from "react";

export default function ButtonSend({ profile }: { profile: ProfileType }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleSend = async () => {
    try {
      setIsLoading(true);

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
        console.log(data.data);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
      }
    } catch (err) {
      console.error("Error en la conexión:", err);
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
    </div>
  );
}
