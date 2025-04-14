import { Dispatch, SetStateAction, useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";
import InputModal from "@/components/Reusable/InputModal";
import Button from "@/components/Reusable/Button";

export default function ModalContact({
  setIsOpen,
  setItem,
}: {
  setIsOpen: Dispatch<SetStateAction<string>>;
  setItem: (item: unknown) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSend = async () => {
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      console.log("Status de la request:", res.status);
    const data = await res.json();
    console.log("Respuesta del servidor:", data);
      if (data.success) {
        setItem(form);
        setIsOpen("");
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (err) {
      console.error(err);
      alert("Error en la conexión");
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
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
      />
      <InputModal
        placeholder="Tu correo"
        type="text"
        icon={<Mail />}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
      />
      <InputModal
        placeholder="Escribe tu mensaje..."
        type="text"
        icon={<MessageSquare />}
        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" button="secondary" size="compact" onClick={() => setIsOpen("")}>
          Cancelar
        </Button>
        <Button type="button" size="compact" button="primary" onClick={handleSend}>
          Enviar
        </Button>
      </div>
    </div>
  );
}