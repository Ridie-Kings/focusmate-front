import { getMyProfile } from "@/services/Profile/getMyProfile";
import SupportClient from "./Support/SupportClient";

export default async function Support() {
  const profile = await getMyProfile();

  return <SupportClient profile={profile.res} />;
}
