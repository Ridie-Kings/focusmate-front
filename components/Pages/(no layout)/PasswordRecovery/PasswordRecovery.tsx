"use client";
import GreenLogo from "@/components/Elements/Svg/Logos/GreenLogo";
import { useToastStore } from "@/stores/toastStore";
import Button from "@/components/Reusable/Button";
import Input from "@/components/Reusable/Input";
import { forgotPassword } from "@/services/Auth/forgotPassword";
import { resetPassword } from "@/services/Auth/resetPassword";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRepeatPassword, setNewRepeatPassword] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const { addToast } = useToastStore();
  const router = useRouter();

  const handleRequestPassword = async () => {
    try {
      const res = await forgotPassword({ email });
      if (res.success) {
        addToast({ message: "El email se a enviado", type: "success" });
        setEmailSent(true);
      } else addToast({ message: "El no email se a enviado", type: "error" });
    } catch (e) {
      console.log("error", e);

      addToast({ message: "El no email se a enviado", type: "error" });
    }
  };

  const handleSendCode = async () => {
    if (newPassword !== newRepeatPassword) {
      addToast({
        type: "error",
        message: "los dos password no son iguales",
      });
      return;
    }
    try {
      const res = await resetPassword({ newPassword, resetCode, email });

      if (res.success) {
        addToast({ message: "El password se a cambiado", type: "success" });
        setEmailSent(true);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else
        addToast({
          message: res.res ?? "El no password se a cambiado",
          type: "error",
        });
    } catch (e) {
      console.log("error:", e);

      addToast({
        message: (e as string) ?? "El no password se a cambiado",
        type: "error",
      });
    }
  };

  return (
    <section className="w-full md:w-[45%] flex-1 flex flex-col items-center justify-center gap-10 px-4 md:px-10 py-8">
      <div className="flex flex-col w-full items-center text-primary-500 mb-8">
        <GreenLogo size="size-26" />
        <p className="text-4xl font-medium mt-2">SherApp</p>
      </div>
      <div className="w-full max-w-md flex flex-col gap-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-3 w-full text-primary-500 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-gray-600 text-lg">
            Te enviaremos un email para recuperarla
          </p>
        </div>
        {emailSent ? (
          <div className="space-y-4">
            <Input
              placeholder="Ingresa el código recibido"
              label="Código de verificación"
              name="code"
              onChange={(e) => setResetCode(e.target.value)}
              defaultValue=""
              type="number"
            />
            <Input
              placeholder="Nueva contraseña"
              label="Nueva contraseña"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
              defaultValue=""
              type="password"
            />
            <Input
              placeholder="Confirma tu contraseña"
              label="Confirmar contraseña"
              name="repeat password"
              onChange={(e) => setNewRepeatPassword(e.target.value)}
              defaultValue=""
              type="text"
            />
          </div>
        ) : (
          <Input
            placeholder="ejemplo@correo.com"
            label="Correo electrónico"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <Button
          onClick={emailSent ? handleSendCode : handleRequestPassword}
          button="primary"
          type="button"
          size="large"
          className="w-full mt-4"
        >
          {emailSent ? "Cambiar contraseña" : "Enviar email"}
        </Button>
      </div>
    </section>
  );
}
