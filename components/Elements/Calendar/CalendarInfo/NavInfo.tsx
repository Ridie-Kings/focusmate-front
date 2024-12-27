import CurrentDate from "../../General/CurrentDate";

const items = ["Day", "Week", "Month"];
export default function NavInfo({
  navType,
  setNavType,
}: {
  navType: string;
  setNavType: (navType: string) => void;
}) {
  return (
    <div className="flex w-full items-center place-content-between">
      <CurrentDate className="border-none" />
      <ul className="flex gap-3">
        {items.map((item) => (
          <li
            key={item}
            onClick={() => setNavType(item)}
            className={`cursor-pointer border-2 text-gray-100 rounded-xl w-20 text-center py-2 transition-all duration-200 ease-out ${
              navType === item ? "bg-black-100 text-white-100 shadow-lg" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
