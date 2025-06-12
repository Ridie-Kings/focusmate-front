import DescriptionProfile from "./InfoProfile/DescriptionProfile";
import Acheivements from "./Acheivements";

export default function InfoProfile() {

  return (
    <div className="flex flex-col lg:flex-row gap-6 flex-1">
      <DescriptionProfile />
      <Acheivements />
    </div>
  );
}
