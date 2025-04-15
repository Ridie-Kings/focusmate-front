import Image from "next/image";
import { ProfileType } from "@/interfaces/Profile/ProfileType";

export default function HeaderProfile({
  profile,
}: {
  profile: ProfileType | null;
}) {
  return (
    <div className="py-6 flex gap-2">
      <Image
        src={profile?.avatar ?? ""}
        width={152}
        height={152}
        alt="avatar"
        className="rounded-full size-[152px] object-cover"
      />
      <div className="py-4 px-2 w-full flex items-center place-content-between">
        <div className="text-black flex flex-col gap-2">
          <p className="text-5xl capitalize">{profile?.user?.fullname}</p>
          <p>{profile?.user?.username}</p>
        </div>
        {/* <div className="flex items-center gap-2">
          <Button size="compact" button="primary" state="enabled" type="button">
            <p>Editar Perfil</p> <Pen size={24} />
          </Button>
          <Button size="compact" button="primary" state="enabled" type="button">
            <p>Cambiar foto</p> <Camera className="flex-1" size={24} />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
