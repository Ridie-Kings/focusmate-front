"use client";
import { MailWarning, Lightbulb } from "lucide-react";
import Button from "@/components/Reusable/Button";
import { useContext } from "react";
import { ModalContext } from "@/components/Provider/ModalProvider";

export default function Support() {
  const { setIsOpen } = useContext(ModalContext);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 w-full justify-center items-center">
      <div className="w-[320px] h-[340px] bg-white border border-primary-500 rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4">
        <MailWarning size={40} className="text-primary-500" />
        <h2 className="text-xl font-semibold">He tenido un problema</h2>
        <p className="text-gray-600 text-sm">
          Si has encontrado un fallo o algo no ha funcionado como esperabas, por favor contáctanos.
        </p>
        <div className="mt-auto">
          <Button
            type="button"
            size="large"
            button="secondary"
            onClick={() => setIsOpen("contact")}
          >
            Contacto
          </Button>
        </div>
      </div>

      <div className="w-[320px] h-[340px] bg-white border border-primary-500 rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4">
        <Lightbulb size={40} className="text-primary-500" />
        <h2 className="text-xl font-semibold">Tengo una idea</h2>
        <p className="text-gray-600 text-sm">
          ¿Se te ha ocurrido algo para mejorar la app o añadir una funcionalidad? ¡Queremos saberlo!
        </p>
        <div className="mt-auto">
          <Button
            type="button"
            size="large"
            button="secondary"
            onClick={() => setIsOpen("contact")}
          >
            Contacto
          </Button>
        </div>
      </div>
    </div>
  );
}
