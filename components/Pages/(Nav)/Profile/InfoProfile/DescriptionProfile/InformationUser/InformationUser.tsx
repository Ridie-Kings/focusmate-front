import { ProfileType } from "@/interfaces/Profile/ProfileType";
import { Cake, Locate, Mail, PersonStanding, Phone } from "lucide-react";

export default function InformationUser({
  profile,
}: {
  profile: ProfileType | null;
}) {
  const userFormatted = [
    {
      icon: <PersonStanding />,
      title: "Nombre Completo",
      label: profile?.user?.fullname,
    },
    { icon: <Cake />, title: "Fecha de Nacimiento", label: null },
    { icon: <Mail />, title: "Correo Electronico", label: profile?.user?.email },
    { icon: <Phone />, title: "Numero de Telefono", label: null },
    { icon: <Locate />, title: "Ubicación", label: null },
  ];

  return (
    <>
      <div className="grid grid-cols-2">
        {userFormatted.map((item) => (
          <div key={item.title} className="flex gap-4 px-6 py-2">
            {item.icon}
            <div>
              <p>{item.title}</p>
              <p className="text-sm text-gray-400">
                {item.label ?? `añade tu ${item.title}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 px-6 py-2">
        <PersonStanding />
        <div>
          <p>Biografia</p>
          <p className="text-sm text-gray-400">
            {profile?.bio === "" ? `añade tu biografia` : profile?.bio}
          </p>
        </div>
      </div>
    </>
  );
}
