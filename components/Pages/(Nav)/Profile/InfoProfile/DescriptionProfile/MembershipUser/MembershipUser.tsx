import BannerMembership from "@/components/Elements/BannerMembership/BannerMembership";
import InfoCard from "./InfoCard";
import { Bell, Bookmark, Settings } from "lucide-react";

export default function MembershipUser() {
  return (
    <>
      <BannerMembership type="premium" />
      <div className="flex gap-8 place-content-between w-full">
        <InfoCard
          title="Incluido en tu plan"
          url={{ label: "Ver más", url: "" }}
          items={[
            {
              icon: <Bell size={24} />,
              label: "Recordatorios inteligentes",
            },
            {
              icon: <Settings size={24} />,
              label: "Revisíon semanal autonática",
            },
            {
              icon: <Bookmark size={24} />,
              label: "Temas visuales personalizados",
            },
          ]}
        />
        <InfoCard
          title="Facturacíon y pago"
          url={{ label: "Mejorar plan", url: "/pricing" }}
          items={[
            {
              icon: <Bell size={24} />,
              label: "Visa terminada en ***6828",
            },
            {
              icon: <Settings size={24} />,
              label: "10 €/ Mensuales",
              subText: "Vence el 26 agosto 2025",
            },
          ]}
        />
      </div>
    </>
  );
}
