import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

export default function Time({
  hiddenTime,
  time,
  updateTime,
  isPlay,
}: {
  hiddenTime: boolean;
  time: TimeType;
  updateTime: (delta: number) => void;
  isPlay: boolean;
}) {
  return (
    <div className="flex gap-4 text-8xl text-primary-green font-light relative">
      {!hiddenTime ? (
        <>
          <button
            onClick={() => updateTime(-1)}
            className="w-10 font-extralight cursor-pointer disabled:text-gray-100"
            disabled={
              (time.hours === 0 && time.min === 0 && time.seg === 0) || isPlay
            }
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
            className="w-10 font-extralight cursor-pointer disabled:text-gray-100"
            disabled={
              (time.hours === 23 && time.min === 60 && time.seg === 60) ||
              isPlay
            }
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
