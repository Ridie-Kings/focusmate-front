"use client";
import GreenLogo from "@/components/Elements/Svg/Logos/GreenLogo";
import { ToastContext } from "@/components/Provider/ToastProvider";
import Button from "@/components/Reusable/Button";
import Input from "@/components/Reusable/Input";
import { forgotPassword } from "@/services/Auth/forgotPassword";
import { resetPassword } from "@/services/Auth/resetPassword";
import { useContext, useState } from "react";

export default function PasswordRecovery() {
  const [email, setEmail] = useState<string>("");
  const [resetCode, setResetCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newRepeatPassword, setNewRepeatPassword] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const { addToast } = useContext(ToastContext);

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
      } else
        addToast({ message: "El no password se a cambiado", type: "error" });
    } catch (e) {
      console.log("error:", e);

      addToast({ message: "El no password se a cambiado", type: "error" });
    }
  };

  return (
    <section className="w-full md:w-[45%] flex-1 flex flex-col items-center justify-center gap-10 px-4 md:px-10 py-8">
      <div className="flex flex-col w-full items-center text-primary-500">
        <GreenLogo size="size-26" />
        <p className="text-4xl font-medium">SherApp</p>
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 w-full text-primary-500 text-center">
          <h1 className="text-3xl md:text-5xl leading-9 font-semibold">
            Olvidaste tu contraseña ?
          </h1>
          <p className="text-center">Te mandamos un email</p>
        </div>
        {emailSent ? (
          <div>
            <Input
              placeholder="El codigo recivido"
              label="El codigo"
              name="code"
              onChange={(e) => setResetCode(e.target.value)}
              defaultValue=""
              field={1}
            ></Input>
            <Input
              placeholder="El Password"
              label="El Password"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
              defaultValue=""
              field={1}
            ></Input>
            <Input
              placeholder="El password repeat"
              label="El password repeat"
              name="repeat password"
              onChange={(e) => setNewRepeatPassword(e.target.value)}
              defaultValue=""
              field={1}
            ></Input>
          </div>
        ) : (
          <Input
            placeholder="Tu email"
            field={2}
            label="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <Button
          onClick={emailSent ? handleSendCode : handleRequestPassword}
          button="primary"
          type="button"
          size="large"
        >
          {emailSent ? "Cambiar contraseña" : "Send Email"}
        </Button>
      </div>
    </section>
  );
}
