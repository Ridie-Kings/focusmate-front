import Input from "@/components/Reusable/Input";
import { useLoading, useProfile } from "@/stores/profileStore";
import { Lock, Mail, Smartphone, User } from "lucide-react";

export default function AccountSettings() {
  const profile = useProfile();
  const loading = useLoading();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Información de la Cuenta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            name="name"
            defaultValue={profile?.user?.fullname}
            placeholder="Tu nombre"
            icon={<User size={16} />}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            defaultValue={profile?.user?.email}
            placeholder="tu@email.com"
            icon={<Mail size={16} />}
          />
          <Input
            label="Teléfono"
            type="tel"
            name="phone"
            defaultValue={loading ? "" : profile?.user?.phoneNumber?.toString()}
            placeholder="+34 XXX XXX XXX"
            icon={<Smartphone size={16} />}
          />
          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            defaultValue={undefined}
            icon={<Lock size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
