import BannerMembership from "@/components/Elements/BannerMembership/BannerMembership";
import InfoCard from "./InfoCard";
import {
  Calendar,
  ClipboardCheck,
  Clock,
  CreditCard,
  Gem,
  Notebook,
} from "lucide-react";

export default function MembershipUser() {
  return (
    <>
      <BannerMembership type="free" />
      <div className="flex flex-col sm:flex-row gap-8 place-content-between w-full">
        <InfoCard
          title="Incluido en tu plan"
          url={{ label: "Ver más", url: "/support" }}
          items={[
            {
              icon: <ClipboardCheck size={24} />,
              label: "Tareas",
            },
            {
              icon: <Notebook size={24} />,
              label: "Habitos",
            },
            {
              icon: <Calendar size={24} />,
              label: "Calendario",
            },
            {
              icon: <Clock size={24} />,
              label: "Pomodoro",
            },
          ]}
        />
        <InfoCard
          title="Facturación y pago"
          url={{ label: "Mejorar plan", url: "/pricing" }}
          items={[
            {
              icon: <CreditCard size={24} />,
              label: "No tienes ninguna tarjeta asociada",
            },
            {
              icon: <Gem size={24} />,
              label: "No tienes ningun plan",
              subText: "Mejora para disfrutar de grandes ventajas",
            },
          ]}
        />
      </div>
    </>
  );
}
