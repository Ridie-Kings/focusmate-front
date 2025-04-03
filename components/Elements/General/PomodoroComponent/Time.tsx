import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import { Dispatch, SetStateAction, useState } from "react";

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
  return (
    <div className="flex gap-4 text-8xl text-primary-green font-light relative">
      {!hiddenTime ? (
        <>
          <button
            onClick={() => updateTime(-1, choseUpdate)}
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
                  ? "blur-lg"
                  : ""
              }
            `}
          >
            {time.hours > 0 && `${String(time.hours).padStart(2, "0")}:`}
            <span
              className={`cursor-pointer transition-colors duration-300 ${
                choseUpdate === "min" ? "text-gray-100" : ""
              }`}
              onClick={() =>
                setChoseUpdate((prev) => (prev === "min" ? "" : "min"))
              }
            >
              {String(time.min).padStart(2, "0")}
            </span>
            :
            <span
              className={`cursor-pointer transition-colors duration-300 ${
                choseUpdate === "seg" ? "text-gray-100" : ""
              }`}
              onClick={() =>
                setChoseUpdate((prev) => (prev === "seg" ? "" : "seg"))
              }
            >
              {String(time.seg).padStart(2, "0")}
            </span>
          </p>
          <button
            onClick={() => updateTime(1, choseUpdate)}
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
