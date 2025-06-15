import { ReactNode } from "react";

export default function StatsCard({
  item,
}: {
  item: { label: string; number: number; icon: ReactNode };
}) {
  return (
    <div className="flex-1 p-4 flex items-center place-content-between overflow-hidden relative gap-2.5 bg-primary-500 rounded-2xl text-white">
      <div className="flex flex-col place-content-between gap-2">
        <p className="text-sm">{item.label}</p>
        <p className="text-xs">{item.number}</p>
      </div>
      <svg
        width="205"
        height="88"
        viewBox="0 0 205 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0"
      >
        <g opacity="0.25">
          <path
            d="M117 -72C52.9349 -72 0.999937 -20.065 0.999943 44C0.999948 108.065 52.9349 160 117 160C181.065 160 233 108.065 233 44C233 -20.065 181.065 -72 117 -72Z"
            stroke="#3B775F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M115.914 -52.3209C62.5268 -52.3209 19.2477 -9.04171 19.2477 44.3458C19.2477 97.7333 62.5268 141.012 115.914 141.012C169.302 141.012 212.581 97.7333 212.581 44.3458C212.581 -9.04172 169.302 -52.3209 115.914 -52.3209Z"
            stroke="#3B775F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M116.709 -33.0888C73.9991 -33.0888 39.3758 1.53454 39.3758 44.2446C39.3758 86.9546 73.9991 121.578 116.709 121.578C159.419 121.578 194.042 86.9546 194.042 44.2445C194.042 1.53452 159.419 -33.0888 116.709 -33.0888Z"
            stroke="#3B775F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M115.624 -13.4092C83.591 -13.4092 57.6235 12.5583 57.6235 44.5908C57.6235 76.6233 83.591 102.591 115.624 102.591C147.656 102.591 173.624 76.6233 173.624 44.5908C173.624 12.5583 147.656 -13.4092 115.624 -13.4092Z"
            stroke="#3B775F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M116.418 5.82195C95.0633 5.82195 77.7516 23.1336 77.7516 44.4886C77.7516 65.8436 95.0633 83.1553 116.418 83.1553C137.773 83.1553 155.085 65.8436 155.085 44.4886C155.085 23.1336 137.773 5.82194 116.418 5.82195Z"
            stroke="#3B775F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M115.333 25.5011C104.655 25.5011 95.9993 34.1569 95.9993 44.8344C95.9993 55.5119 104.655 64.1677 115.333 64.1677C126.01 64.1677 134.666 55.5119 134.666 44.8344C134.666 34.1569 126.01 25.5011 115.333 25.5011Z"
            stroke="#3B775F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <div className="bg-primary-400 rounded-full p-2">{item.icon}</div>
    </div>
  );
}
