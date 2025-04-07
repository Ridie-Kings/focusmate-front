"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { TimerContextType, TimeType } from "@/interfaces/Pomodoro/Pomodoro";
import TimerFullScreen from "../Elements/Timer/TimerFullScreen";

export const TimerContext = createContext<TimerContextType>({
	isOpen: false,
	setIsOpen: () => {},
	time: { hours: 0, min: 0, seg: 0 },
	setTime: () => {},
	isPlay: false,
	togglePlay: () => {},
	resetTimer: () => {},
	updateTimeManually: () => {},
});

export default function TimerProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [time, setTime] = useState<TimeType>({ hours: 0, min: 25, seg: 0 });
	const [isPlay, setIsPlay] = useState(false);
	const [isClient, setIsClient] = useState(false);

	// Referencias para el temporizador
	const totalSecondsRef = useRef(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Funciones auxiliares para convertir entre tiempo y segundos
	const timeToSeconds = (t: TimeType): number =>
		t.hours * 3600 + t.min * 60 + t.seg;
	const secondsToTime = (seconds: number): TimeType => ({
		hours: Math.floor(seconds / 3600),
		min: Math.floor((seconds % 3600) / 60),
		seg: seconds % 60,
	});

	// Cuando time cambia, actualizar totalSecondsRef (si no está reproduciéndose)
	useEffect(() => {
		if (!isPlay) {
			totalSecondsRef.current = timeToSeconds(time);
			console.log(
				"Tiempo actualizado:",
				time,
				"Segundos:",
				totalSecondsRef.current
			);
		}
	}, [time, isPlay]);

	// Función para actualizar manualmente el tiempo
	const updateTimeManually = (delta: number, updateType: string) => {
		if (isPlay) return; // No permitir cambios durante la reproducción

		setTime((prevTime) => {
			let seconds = timeToSeconds(prevTime);

			if (updateType === "hours") {
				seconds += delta * 3600;
			} else if (updateType === "min") {
				seconds += delta * 60;
			} else if (updateType === "seg") {
				seconds += delta;
			}

			seconds = Math.max(0, seconds);
			return secondsToTime(seconds);
		});
	};

	// Función para alternar reproducción
	const togglePlay = () => {
		setIsPlay((prev) => !prev);
	};

	// Función para reiniciar el temporizador
	const resetTimer = () => {
		setIsPlay(false);
		setTime({ hours: 0, min: 25, seg: 0 });
		totalSecondsRef.current = 0;
	};

	// Efecto para manejar el temporizador
	useEffect(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		if (isPlay && totalSecondsRef.current > 0) {
			console.log(
				"Iniciando temporizador con",
				totalSecondsRef.current,
				"segundos"
			);

			intervalRef.current = setInterval(() => {
				totalSecondsRef.current -= 1;

				const newTime = secondsToTime(totalSecondsRef.current);
				console.log(
					"Tick, segundos restantes:",
					totalSecondsRef.current,
					"Nuevo tiempo:",
					newTime
				);

				setTime(newTime);

				if (totalSecondsRef.current <= 0) {
					if (intervalRef.current) {
						clearInterval(intervalRef.current);
						intervalRef.current = null;
					}
					setIsPlay(false);
				}
			}, 1000);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isPlay]);

	// Tu código original para inicializar y sincronizar con localStorage
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;

		try {
			const storedTime = localStorage.getItem("time");

			if (storedTime && timeToSeconds(time) === 0) {
				const parsedTime = JSON.parse(storedTime);
				setTime(parsedTime);
			} else {
				localStorage.setItem("time", JSON.stringify(time));
			}
		} catch (error) {
			console.error("localStorage error:", error);
		}
	}, [time, isClient]);

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

	// Actualiza el valor del contexto para incluir las nuevas funciones
	const contextValue = {
		isOpen,
		setIsOpen,
		time,
		setTime,
		isPlay,
		togglePlay,
		resetTimer,
		updateTimeManually,
	};

	return (
		<TimerContext.Provider value={contextValue}>
			{isOpen && <TimerFullScreen />}
			{children}
		</TimerContext.Provider>
	);
}
