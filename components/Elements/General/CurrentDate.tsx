import { format } from "date-fns";
import CircularTextTop from "../Svg/CircularTextTop";
import CircularTextBottom from "../Svg/CircularTextBottom";

export default function CurrentDate({
  background = true,
}: {
  background?: boolean;
}) {
  const today = new Date();

  return (
    <div
      className={`relative overflow-hidden rounded-2xl px-4 py-6 transition-all duration-200 ease-out ${
        background && "bg-primary-green text-white hover:shadow-lg"
      }`}
    >
      <p className="text-4xl">{format(today, "eeee")}</p>
      <p className="text-2xl">{format(today, "dd MMMM yyyy")}</p>
      {background && (
        <>
          <CircularTextTop className="absolute right-0 -top-3" />
          <CircularTextBottom className="absolute right-2 -bottom-2" />
        </>
      )}
    </div>
  );
}
