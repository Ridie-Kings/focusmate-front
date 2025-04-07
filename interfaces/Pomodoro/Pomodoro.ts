import { Dispatch, SetStateAction } from "react";

export type TimeType = {
	min: number;
	seg: number;
	hours: number;
};

export type TimerContextType = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	time: TimeType;
	setTime: React.Dispatch<React.SetStateAction<TimeType>>;
	isPlay: boolean;
	togglePlay: () => void;
	resetTimer: () => void;
	updateTimeManually: (delta: number, updateType: string) => void;
};
