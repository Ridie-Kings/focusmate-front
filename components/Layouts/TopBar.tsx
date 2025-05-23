// import { Search } from "lucide-react";
// import Notification from "./TopBar/Notification";
import PageTitle from "./TopBar/PageTitle";
import { getMyProfile } from "@/services/Profile/getMyProfile";
import Image from "next/image";
import Link from "next/link";

export default async function TopBar() {
  const profil = await getMyProfile();

  return (
    <header className="flex place-content-between pr-15 sm:pr-0 py-2 px-6 sm:p-6 w-full border-b border-primary-200 bg-white z-50 ">
      <div className="flex flex-col sm:flex-1 justify-center">
        <p className="sm:text-lg hidden sm:block text-primary-500 capitalize">
          Bienvenido, {profil?.user?.fullname}!
        </p>
        <PageTitle />
      </div>
      <div className="flex items-end justify-end gap-3">
        {/* <Search
          size={36}
          className="border border-secondary-700 cursor-pointer rounded-full bg-secondary-100 text-secondary-700 p-2"
        />
        <Notification /> */}
        <Link
          href={"/profile"}
          className="overflow-hidden rounded-full cursor-pointer size-9"
        >
          <Image
            src={
              profil && profil?.avatar !== ""
                ? profil?.avatar
                : "/images/errors/errorImage.png"
            }
            width={36}
            height={36}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
