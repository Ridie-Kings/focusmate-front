import BannerExemple from "@/components/Elements/Svg/BannerExemple";
import { getMyProfile } from "@/services/Profile/getMyProfile";
import HeaderProfile from "./Profile/HeaderProfile";
import InfoProfile from "./Profile/InfoProfile";

export default async function Profile() {
  const profile = await getMyProfile();

  return (
    <>
      <BannerExemple />
      <div className="py-6 px-4 sm:px-6 flex flex-col h-full flex-1">
        <HeaderProfile profile={profile.res} />
        <div className="flex gap-2 items-center mb-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((profile.res?.xp ?? 0) / 1295) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {profile.res?.xp ?? 0} / 1295 XP
          </p>
        </div>
        <InfoProfile profile={profile.res} />
      </div>
    </>
  );
}
