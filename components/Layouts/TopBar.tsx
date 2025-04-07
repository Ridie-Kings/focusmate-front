import { Search } from "lucide-react";
import Notification from "./TopBar/Notification";
import PageTitle from "./TopBar/PageTitle";
import { getMyProfile } from "@/services/Profile/getMyProfile";

export default async function TopBar() {
  const profil = await getMyProfile();
  console.log("profil:", profil);

  return (
    <section className="flex place-content-between p-6 w-full">
      <div className="flex flex-col flex-1">
        <PageTitle />
        <p className="text-lg">Bienvenido, Mateo!</p>
      </div>
      <div className="flex items-end justify-end gap-3 flex-1">
        <Search
          size={36}
          className="border border-accent cursor-pointer rounded-full text-accent p-2"
        />
        <Notification />
        <div className="rounded-full bg-gray-100 size-9 cursor-pointer"></div>
      </div>
    </section>
  );
}
