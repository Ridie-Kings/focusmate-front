import BannerExemple from "@/components/Elements/Svg/BannerExemple";
import HeaderProfile from "./Profile/HeaderProfile";
import InfoProfile from "./Profile/InfoProfile";
import XpBar from "./Profile/XpBar";

export default function Profile() {

  return (
    <>
      <BannerExemple />
      <div className="py-6 px-4 sm:px-6 flex flex-col h-full flex-1">
        <HeaderProfile />
        <XpBar />
        <InfoProfile />
      </div>
    </>
  );
}
