"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";

type TimerFullScreenContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
export const TimerFullScreenContext = createContext<TimerFullScreenContextType>(
  {
    isOpen: false,
    setIsOpen: () => {},
  }
);

export default function TimerFullScreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <TimerFullScreenContext.Provider value={{ isOpen, setIsOpen }}>
      {isOpen && <TimerFullScreen />}
      {children}
    </TimerFullScreenContext.Provider>
  );
}
