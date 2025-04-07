"use client";
import { Eye } from "lucide-react";
import { useState, useContext, useEffect, Dispatch } from "react";
import { TimerContext } from "@/components/Provider/TimerProvider";
import BarTimer from "../BarTimer";
import Time from "./Time";
import Commands from "./Commands";
import { TimeType } from "@/interfaces/Pomodoro/Pomodoro";

interface TimerProps {
	time: TimeType;
	setTime: Dispatch<React.SetStateAction<TimeType>>;
	menu: string;
}

export default function Timer({ menu }: TimerProps) {
	const {
		time,
		isPlay,
		togglePlay,
		resetTimer,
		updateTimeManually,
		setIsOpen,
	} = useContext(TimerContext);

	const [hiddenTime, setHiddenTime] = useState(false);
	const [choseUpdate, setChoseUpdate] = useState("");

	// Efecto para resetear el estado de reproducción cuando cambia el menú
	useEffect(() => {
		if (isPlay) {
			togglePlay(); // Detener reproducción cuando cambia el menú
		}
	}, [menu]);

	const handleClick = (action: string) => {
		switch (action) {
			case "openFullScreen":
				setIsOpen(true);
				break;
			case "togglePlay":
				setChoseUpdate("");
				togglePlay();
				break;
			case "reset":
				resetTimer();
				break;
			default:
				break;
		}
	};

	return (
		<div className="flex flex-col items-center gap-2 w-full">
			<Eye
				size={40}
				className="cursor-pointer text-primary-green"
				onClick={() => setHiddenTime(!hiddenTime)}
			/>
			<Time
				hiddenTime={hiddenTime}
				time={time}
				updateTime={updateTimeManually}
				isPlay={isPlay}
				setChoseUpdate={setChoseUpdate}
				choseUpdate={choseUpdate}
			/>
			<BarTimer />
			<Commands handleClick={handleClick} isPlay={isPlay} />
		</div>
	);
}
