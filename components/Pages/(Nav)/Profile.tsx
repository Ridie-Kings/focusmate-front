import BannerExemple from "@/components/Elements/Svg/BannerExemple";
import { getMyProfile } from "@/services/Profile/getMyProfile";
import HeaderProfile from "./Profile/HeaderProfile";
import InfoProfile from "./Profile/InfoProfile";

export default async function Profile() {
  const profile = await getMyProfile();

  return (
    <>
      <BannerExemple />
      <div className="py-6 px-6 flex flex-col h-full flex-1">
        <HeaderProfile profile={profile} />
        <InfoProfile profile={profile} />
      </div>
    </>
  );
}
