import { Dispatch, SetStateAction, useState } from "react";
import {
  MessageSquare,
  AlertCircle,
  Captions,
} from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";
import Button from "@/components/Reusable/Button";
import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { useToast } from "@/components/Provider/ToastProvider";

interface ContactForm {
  title: string;
  name: string;
  email: string;
  message: string;
}

interface ModalContactProps {
  setIsOpen: Dispatch<SetStateAction<{ text: string; other?: unknown }>>;
  profile: ProfileType | null;
}

export default function ModalContact({
  setIsOpen,
  profile,
}: ModalContactProps) {
  const [form, setForm] = useState<ContactForm>({
    title: "",
    name: profile?.user.fullname || "",
    email: profile?.user?.email || "",
    message: "",
  });
  const { addToast } = useToast();

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.message.trim()) {
      newErrors.message = "El mensaje es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormField = <K extends keyof ContactForm>(
    field: K,
    value: ContactForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSend = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok)
        addToast({ type: "success", message: "Mensaje enviado correctamente" });
      else addToast({ type: "error", message: "Error al enviar el mensaje" });

      setTimeout(() => {
        setIsOpen({ text: "" });
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      addToast({
        type: "error",
        message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold text-primary-500 text-center">
        Contáctanos
      </h2>

      <InputModal
        placeholder="Titulo"
        type="text"
        icon={<Captions />}
        onChange={(e) => updateFormField("title", e.target.value)}
      />

      {errors.title && (
        <div className="flex items-center gap-1 text-red-500 text-xs -mt-3 ml-1">
          <AlertCircle size={12} />
          <span>{errors.title}</span>
        </div>
      )}

      <InputModal
        placeholder="Escribe tu mensaje..."
        type="text"
        icon={<MessageSquare />}
        onChange={(e) => updateFormField("message", e.target.value)}
      />

      {errors.message && (
        <div className="flex items-center gap-1 text-red-500 text-xs -mt-3 ml-1">
          <AlertCircle size={12} />
          <span>{errors.message}</span>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          button="secondary"
          size="compact"
          onClick={() => setIsOpen({ text: "" })}
        >
          Cancelar
        </Button>
        <Button
          type="button"
          size="compact"
          button="primary"
          onClick={handleSend}
        >
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
}
