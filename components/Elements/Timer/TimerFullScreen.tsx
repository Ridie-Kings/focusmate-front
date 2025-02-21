import { TimerFullScreenContext } from "@/components/Provider/TimerFullScreenProvider";
import { useContext } from "react";
import CloseBtn from "./CloseBtn";
import TimerContainer from "./TimerComponent/TimerContainer";
import { motion } from "motion/react";

export default function TimerFullScreen() {
  const { setIsOpen } = useContext(TimerFullScreenContext);
  return (
    <main className="w-full h-screen flex items-center justify-center p-1 absolute left-0 top-0 z-10 bg-white animate-opacStart">
      <div className="bg-black-100 w-full h-full rounded-2xl flex flex-col items-center justify-center overflow-hidden relative">
        <div className="w-full 2xl:h-44 xl:h-15 absolute top-0 group flex xl:items-center xl:justify-center justify-end p-5">
          <CloseBtn setIsOpen={setIsOpen} />
        </div>
        <TimerContainer />
      </div>
    </main>
  );
}
