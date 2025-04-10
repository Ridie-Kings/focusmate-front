import { ProfileType } from "@/interfaces/Profile/ProfileType";
import DescriptionProfile from "./InfoProfile/DescriptionProfile";
import Acheivements from "./Acheivements";

export default function InfoProfile({
  profile,
}: {
  profile: ProfileType | null;
}) {
  return (
    <div className="flex gap-6 flex-1">
      <DescriptionProfile profile={profile} />
      <Acheivements profile={profile} />
    </div>
  );
}
