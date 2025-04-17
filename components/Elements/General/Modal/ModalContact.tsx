import { Dispatch, SetStateAction, useState } from "react";
import { Mail, User, MessageSquare, AlertCircle } from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";
import Button from "@/components/Reusable/Button";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ModalContactProps {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (item: ContactForm) => void;
}

export default function ModalContact({
  setIsOpen,
  setItem,
}: ModalContactProps) {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!form.email.trim()) {
      newErrors.email = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Formato de correo inválido";
    }

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
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (serverError) {
      setServerError(null);
    }
  };

  const handleSend = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setServerError(null);

      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setItem(form);
        setIsOpen("");
      } else {
        setServerError(data.message || "Error al enviar el mensaje");
      }
    } catch (err) {
      console.error("Error en la conexión:", err);
      setServerError("Error en la conexión. Inténtalo de nuevo más tarde.");
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
        placeholder="Tu nombre"
        type="text"
        icon={<User />}
        onChange={(e) => updateFormField("name", e.target.value)}
      />
      {errors.name && (
        <div className="flex items-center gap-1 text-red-500 text-xs -mt-3 ml-1">
          <AlertCircle size={12} />
          <span>{errors.name}</span>
        </div>
      )}

      <InputModal
        placeholder="Tu correo"
        type="text"
        icon={<Mail />}
        onChange={(e) => updateFormField("email", e.target.value)}
      />
      {errors.email && (
        <div className="flex items-center gap-1 text-red-500 text-xs -mt-3 ml-1">
          <AlertCircle size={12} />
          <span>{errors.email}</span>
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

      {serverError && (
        <div className="flex items-center gap-2 text-red-500 text-sm px-2">
          <AlertCircle size={16} />
          <span>{serverError}</span>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          button="secondary"
          size="compact"
          onClick={() => setIsOpen("")}
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
