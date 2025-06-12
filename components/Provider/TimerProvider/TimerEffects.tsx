"use client";
import { useEffect, useRef } from "react";
import {
  useIsChronometer,
  useIsPlay,
  useMenu,
  useTime,
  useCycles,
  useTotalCycles,
  useIsType,
  useTimerStore,
} from "@/stores/timerStore";
import { useStatus, useWebSocketStore } from "@/stores/websocketStore";
import { useTimer } from "./TimerLogic";
import { useChronometer } from "./ChronometerLogic";

export default function TimerEffects() {
  const {
    setIsPlay,
    setTime,
    setMenu,
    setStartedElement,
    setCycles,
    setTotalCycles,
  } = useTimerStore((state) => state.actions);

  const isPlay = useIsPlay();
  const isChronometer = useIsChronometer();
  const time = useTime();
  const menu = useMenu();
  const cycles = useCycles();
  const totalCycles = useTotalCycles();
  const isType = useIsType();

  const status = useStatus();
  const { setStatus } = useWebSocketStore((state) => state.actions);

  const timerControlsRef = useRef<ReturnType<typeof useTimer> | null>(null);
  const chronometerControlsRef = useRef<ReturnType<
    typeof useChronometer
  > | null>(null);

  const timerControls = useTimer({
    status: status,
    setStatus: setStatus,
    isPlay: isPlay && !isChronometer,
    setIsPlay: setIsPlay,
    time: time,
    setTime: setTime,
    menu: menu,
    setMenu: setMenu,
    setStartedElement: setStartedElement,
    setCycles: setCycles,
    setTotalCycles: setTotalCycles,
    cycles: cycles,
    totalCycles: totalCycles,
    isChronometer: isChronometer,
  });

  const chronometerControls = useChronometer({
    menu: menu,
    isType: isType,
    time: time,
    setTime: setTime,
    isPlay: isPlay && isChronometer,
    setIsPlay: setIsPlay,
    isChronometer: isChronometer,
  });

  useEffect(() => {
    if (!isChronometer) {
      timerControlsRef.current = timerControls;
    }
  }, [timerControls, isChronometer]);

  useEffect(() => {
    if (isChronometer) {
      chronometerControlsRef.current = chronometerControls;
    }
  }, [chronometerControls, isChronometer]);

  useEffect(() => {
    if (isChronometer) {
      timerControlsRef.current = null;
    } else {
      chronometerControlsRef.current = null;
    }
  }, [isChronometer]);

  return null;
}
