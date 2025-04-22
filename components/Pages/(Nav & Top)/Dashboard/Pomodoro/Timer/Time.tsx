import HiddenTimerPlant from "@/components/Elements/Svg/HiddenTimerPlant";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

export default function Time({
  hiddenTime,
  time,
  updateTime,
  isPlay,
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

  const MAX_HOURS = 5;
  const MAX_MINUTES = 300;

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

    let newMin = parseInt(minValue) || 0;

    if (newMin > MAX_MINUTES) {
      newMin = MAX_MINUTES;
    }

    if (newMin >= 0) {
      const delta = newMin - time.min;
      updateTime(delta, "min");
    } else {
      setMinValue(String(time.min).padStart(2, "0"));
    }
    setEditMin(false);
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value) || 0;

    if (numValue > MAX_MINUTES) {
      setMinValue(String(MAX_MINUTES).padStart(2, "0"));
    } else {
      setMinValue(value);
    }
  };

  const handleHoursChange = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    if ("key" in e && e.key !== "Enter") return;

    let newHours = parseInt(hoursValue) || 0;

    if (newHours > MAX_HOURS) {
      newHours = MAX_HOURS;
    }

    if (newHours >= 0) {
      const delta = newHours - time.hours;
      updateTime(delta, "hours");
    } else {
      setHoursValue(String(time.hours).padStart(2, "0"));
    }
    setEditHours(false);
  };

  const handleHoursInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value) || 0;

    if (numValue > MAX_HOURS) {
      setHoursValue(String(MAX_HOURS).padStart(2, "0"));
    } else {
      setHoursValue(value);
    }
  };

  useEffect(() => {
    const currentMin = time.min > MAX_MINUTES ? MAX_MINUTES : time.min;
    setMinValue(String(currentMin).padStart(2, "0"));
  }, [time.min]);

  useEffect(() => {
    const currentHours = time.hours > MAX_HOURS ? MAX_HOURS : time.hours;
    setHoursValue(String(currentHours).padStart(2, "0"));
  }, [time.hours]);

  return (
    <div className="flex gap-4 text-8xl text-primary-500 font-light relative">
      {!hiddenTime ? (
        <p>
          {time.hours > 0 && (
            <>
              {editHours ? (
                <>
                  <input
                    ref={hoursInputRef}
                    type="text"
                    value={hoursValue}
                    onChange={handleHoursInput}
                    onKeyDown={handleHoursChange}
                    onBlur={handleHoursChange}
                    className="w-28 h-[95px] bg-transparent text-center outline-none"
                    disabled={isPlay}
                    maxLength={1}
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
              onChange={handleMinInput}
              onKeyDown={handleMinChange}
              onBlur={handleMinChange}
              className="w-28 h-[95px] bg-transparent text-center outline-none"
              disabled={isPlay}
              maxLength={3}
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
