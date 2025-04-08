import HiddenTimerPlant from "@/components/Elements/Svg/HiddenTimerPlant";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

export default function Time({
  hiddenTime,
  time,
  updateTime,
  isPlay,
  choseUpdate,
  setChoseUpdate,
}: {
  hiddenTime: boolean;
  time: TimeType;
  updateTime: (delta: number, choseUpdate: string) => void;
  isPlay: boolean;
  choseUpdate: string;
  setChoseUpdate: Dispatch<SetStateAction<string>>;
}) {
  const [editHours, setEditHours] = useState(false);
  const [editMin, setEditMin] = useState(false);
  const [hoursValue, setHoursValue] = useState(
    String(time.hours).padStart(2, "0")
  );
  const [minValue, setMinValue] = useState(String(time.min).padStart(2, "0"));

  const hoursInputRef = useRef<HTMLInputElement>(null);
  const minInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMin && minInputRef.current) {
      minInputRef.current.focus();
      minInputRef.current.select();
    }
  }, [editMin]);

  useEffect(() => {
    if (editHours && hoursInputRef.current) {
      hoursInputRef.current.focus();
      hoursInputRef.current.select();
    }
  }, [editHours]);

  const handleMinChange = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    const newMin = parseInt(minValue) || 0;
    if (newMin >= 0) {
      const delta = newMin - time.min;
      updateTime(delta, "min");
    } else {
      setMinValue(String(time.min).padStart(2, "0"));
    }
    setEditMin(false);
  };

  const handleHoursChange = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    const newHours = parseInt(hoursValue) || 0;
    if (newHours >= 0) {
      const delta = newHours - time.hours;
      updateTime(delta, "hours");
    } else {
      setHoursValue(String(time.hours).padStart(2, "0"));
    }
    setEditHours(false);
  };

  useEffect(() => {
    setMinValue(String(time.min).padStart(2, "0"));
  }, [time.min]);

  useEffect(() => {
    setHoursValue(String(time.hours).padStart(2, "0"));
  }, [time.hours]);

  return (
    <div className="flex gap-4 text-8xl text-primary-500 font-light relative">
      {!hiddenTime ? (
        <p
          className={`
            transition-all duration-200
            ${
              time.hours === 0 && time.min === 0 && time.seg === 0
                ? "blur-lg"
                : ""
            }
          `}
        >
          {time.hours > 0 && (
            <>
              {editHours ? (
                <>
                  <input
                    ref={hoursInputRef}
                    type="text"
                    value={hoursValue}
                    onChange={(e) => setHoursValue(e.target.value)}
                    onKeyDown={handleHoursChange}
                    onBlur={handleHoursChange}
                    className="w-28 h-[95px] bg-transparent text-center outline-none"
                    disabled={isPlay}
                  />
                  <span>:</span>
                </>
              ) : (
                <span
                  className="cursor-pointer transition-colors duration-300"
                  onClick={() => {
                    if (!isPlay) {
                      setEditHours(true);
                      setChoseUpdate("hours");
                    }
                  }}
                >
                  {String(time.hours).padStart(2, "0")}:
                </span>
              )}
            </>
          )}
          {editMin ? (
            <input
              ref={minInputRef}
              type="text"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              onKeyDown={handleMinChange}
              onBlur={handleMinChange}
              className="w-28 h-[95px] bg-transparent text-center outline-none"
              disabled={isPlay}
            />
          ) : (
            <span
              className="cursor-pointer transition-colors duration-300"
              onClick={() => {
                if (!isPlay) {
                  setEditMin(true);
                  setChoseUpdate("min");
                }
              }}
            >
              {String(time.min).padStart(2, "0")}
            </span>
          )}
          :
          <span
            className="cursor-pointer transition-colors duration-300"
            onClick={() =>
              setChoseUpdate((prev) => (prev === "seg" ? "" : "seg"))
            }
          >
            {String(time.seg).padStart(2, "0")}
          </span>
        </p>
      ) : (
        <HiddenTimerPlant />
      )}
    </div>
  );
}
