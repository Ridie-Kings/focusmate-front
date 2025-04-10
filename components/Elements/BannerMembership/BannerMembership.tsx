import FreeMembership from "./BannersTypes/FreeMembership";
import PremiumMembership from "./BannersTypes/PremiumMembership";
import TrialMembership from "./BannersTypes/TrialMembership";

export default function BannerMembership({
  type,
}: {
  type: "premium" | "free" | "trial";
}) {
  const render = () => {
    switch (type) {
      case "free":
        return <FreeMembership />;
      case "premium":
        return <PremiumMembership />;
      case "trial":
        return <TrialMembership />;
      default:
        return "";
    }
  };
  return (
    <div className="h-40 w-full flex items-center bg-quaternary-100 rounded-2xl relative">
      {render()}
    </div>
  );
}
