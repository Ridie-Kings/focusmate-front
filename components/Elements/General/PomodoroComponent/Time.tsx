import { TimeType } from "./Timer";

export default function Time({
  hiddenTime,
  time,
  updateTime,
}: {
  hiddenTime: boolean;
  time: TimeType;
  updateTime: (delta: number) => void;
}) {
  return (
    <div className="flex gap-4 text-8xl text-primary-green font-light relative">
      {!hiddenTime ? (
        <>
          <button
            onClick={() => updateTime(-1)}
            className="w-10 font-extralight"
            disabled={time.hours === 0 && time.min === 0 && time.seg === 0}
          >
            -
          </button>
          <p
            className={`
              transition-all duration-200
              ${
                time.hours === 0 && time.min === 0 && time.seg === 0
                  ? " blur-lg"
                  : ""
              }
            `}
          >
            {time.hours > 0 && `${String(time.hours).padStart(2, "0")}:`}
            {String(time.min).padStart(2, "0")}:
            {String(time.seg).padStart(2, "0")}
          </p>
          <button
            onClick={() => updateTime(1)}
            className="w-10 font-extralight"
          >
            +
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
