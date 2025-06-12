import { useModalStore } from "@/stores/modalStore";
import Button from "@/components/Reusable/Button";
import { AlertTriangle } from "lucide-react";
import { useProfileStore } from "@/stores/profileStore";
import { softDeleteProfile } from "@/services/Profile/softDeleteProfile";
import { logout } from "@/lib";

export default function ModalDeleteAccount() {
  const { setIsOpen } = useModalStore((state) => state.actions);
  const { clearProfile } = useProfileStore((state) => state.actions);

  const handleDeleteAccount = async () => {
    clearProfile();
    await softDeleteProfile();
    await logout();
    setIsOpen({ text: "" });
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="size-7 text-red-500" />
        <h2 className="text-2xl font-semibold">Delete Account</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Estás a punto de eliminar tu cuenta. Tu cuenta sera eliminada
        permanentemente en 20 días. Inicia sesión de nuevo antes de que se acabe
        el tiempo para recuperar tu cuenta.
      </p>

      <div className="flex gap-3 justify-end">
        <Button
          size="compact"
          button="secondary"
          type="button"
          onClick={() => setIsOpen({ text: "" })}
        >
          Cancelar
        </Button>
        <Button
          size="compact"
          button="danger"
          type="button"
          onClick={handleDeleteAccount}
        >
          Eliminar cuenta
        </Button>
      </div>
    </div>
  );
}
