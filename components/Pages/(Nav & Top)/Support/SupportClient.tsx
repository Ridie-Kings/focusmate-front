"use client";
import { MailWarning, Lightbulb } from "lucide-react";
import Button from "@/components/Reusable/Button";
import { useModalStore } from "@/stores/modalStore";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

interface SupportClientProps {
  profile: ProfileType | null;
}

export default function SupportClient({ profile }: SupportClientProps) {
  const { setIsOpen } = useModalStore();
  console.info(profile);
  return (
    <div className="flex flex-col gap-8 p-8 w-full justify-center items-center">
      <p className="text-center text-primary-500 w-3/5 text-lg">
        En <b>SherpApp</b> queremos cubrir tus necesidades y ofrecerte
        exactamente lo que nos pidas. Esta página ha sido desarrollada pensando
        en ti, <span className=" capitalize">{profile?.user.fullname}</span>: tú
        eres lo más importante. ¡Cuéntanos tu idea o problema, y lo haremos
        realidad!
      </p>
      <div className="flex flex-col md:flex-row gap-8 p-8 w-full justify-center items-center">
        <div className="w-[320px] h-[340px] bg-white border border-primary-500 rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4">
          <MailWarning size={40} className="text-primary-500" />
          <h2 className="text-xl font-semibold">He tenido un problema</h2>
          <p className="text-gray-600 text-sm">
            Si has encontrado un fallo o algo no ha funcionado como esperabas,
            por favor contáctanos.
          </p>
          <div className="mt-auto">
            <Button
              type="button"
              size="large"
              button="secondary"
              onClick={() => setIsOpen({ text: "contact" })}
            >
              Contacto
            </Button>
          </div>
        </div>

        <div className="w-[320px] h-[340px] bg-white border border-primary-500 rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4">
          <Lightbulb size={40} className="text-primary-500" />
          <h2 className="text-xl font-semibold">Tengo una idea</h2>
          <p className="text-gray-600 text-sm">
            ¿Se te ha ocurrido algo para mejorar la app o añadir una
            funcionalidad? ¡Queremos saberlo!
          </p>
          <div className="mt-auto">
            <Button
              type="button"
              size="large"
              button="secondary"
              onClick={() => setIsOpen({ text: "contact" })}
            >
              Contacto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
