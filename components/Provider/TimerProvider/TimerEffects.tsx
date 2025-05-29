"use client";
import { useEffect, useRef } from "react";
import { useTimerStore } from "@/stores/timerStore";
import { useWebSocketStore } from "@/stores/websocketStore";
import { useTimer } from "./TimerLogic";
import { useChronometer } from "./ChronometerLogic";

export default function TimerEffects() {
  const timerState = useTimerStore();
  const wsState = useWebSocketStore();
  const timerControlsRef = useRef<ReturnType<typeof useTimer> | null>(null);
  const chronometerControlsRef = useRef<ReturnType<
    typeof useChronometer
  > | null>(null);

  const timerControls = useTimer({
    status: wsState.status,
    setStatus: wsState.setStatus,
    isPlay: timerState.isPlay && !timerState.isChronometer,
    setIsPlay: timerState.setIsPlay,
    time: timerState.time,
    setTime: timerState.setTime,
    menu: timerState.menu,
    setMenu: timerState.setMenu,
    setStartedElement: timerState.setStartedElement,
    setCycles: timerState.setCycles,
    setTotalCycles: timerState.setTotalCycles,
    cycles: timerState.cycles,
    totalCycles: timerState.totalCycles,
    isChronometer: timerState.isChronometer,
  });

  const chronometerControls = useChronometer({
    menu: timerState.menu,
    isType: timerState.isType,
    time: timerState.time,
    setTime: timerState.setTime,
    isPlay: timerState.isPlay && timerState.isChronometer,
    setIsPlay: timerState.setIsPlay,
    isChronometer: timerState.isChronometer,
  });

  useEffect(() => {
    if (!timerState.isChronometer) {
      timerControlsRef.current = timerControls;
    }
  }, [timerControls, timerState.isChronometer]);

  useEffect(() => {
    if (timerState.isChronometer) {
      chronometerControlsRef.current = chronometerControls;
    }
  }, [chronometerControls, timerState.isChronometer]);

  useEffect(() => {
    if (timerState.isChronometer) {
      timerControlsRef.current = null;
    } else {
      chronometerControlsRef.current = null;
    }
  }, [timerState.isChronometer]);

  return null;
}
