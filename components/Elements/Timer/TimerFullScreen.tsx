import { TimerFullScreenContext } from "@/components/Provider/TimerFullScreenProvider";
import { useContext } from "react";
import CloseBtn from "./CloseBtn";
import TimerContainer from "./TimerComponent/TimerContainer";

export default function TimerFullScreen() {
  const { setIsOpen } = useContext(TimerFullScreenContext);
  return (
    <main className="w-full h-screen flex items-center justify-center p-1 absolute left-0 top-0 z-10 bg-white">
      <div className="bg-black-100 w-full h-full rounded-2xl flex flex-col items-center justify-center overflow-hidden relative">
        <CloseBtn setIsOpen={setIsOpen} />
        <TimerContainer />
      </div>
    </main>
  );
}
