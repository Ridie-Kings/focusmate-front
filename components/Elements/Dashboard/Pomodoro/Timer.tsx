"use client";
import { CirclePlay, Ellipsis, Eye, EyeOff, StepForward } from "lucide-react";
import { useEffect, useState } from "react";

const item = [
  {
    id: 1,
    icon: <Ellipsis size={30} />,
  },
  {
    id: 2,
    icon: <CirclePlay size={40} />,
  },
  {
    id: 3,
    icon: <StepForward size={30} />,
  },
];

export default function Timer({ menu }: { menu: string }) {
  const [min, setMin] = useState(25);
  const [seg, setSeg] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const handleAddTime = () => {
    if (seg === 60 && min === 60) return;
    if (seg >= 59) {
      setSeg(0);
      setMin(min + 1);
    } else {
      setSeg((prev) => prev + 1);
    }
  };
  const handleRemoveTime = () => {
    if (seg === 0) {
      setSeg(59);
      setMin(min - 1);
    } else {
      setSeg((prev) => prev - 1);
    }
  };

  const handleClick = (id: number) => {
    setIsCountdown(!isCountdown);
    switch (id) {
      case 1:
        setIsCountdown(!isCountdown);
        break;
      case 2:
        setIsPlay(!isPlay);
        break;
      case 3:
        setIsCountdown(false);
        setMin(25);
        setSeg(0);
        setIsPlay(false);
        break;
    }
  };

  useEffect(() => {
    switch (menu) {
      case "Concentracion":
        setMin(25);
        setSeg(0);
        break;
      case "Descanso Corto":
        setMin(5);
        setSeg(0);
        break;
      case "Descanso Largo":
        setMin(15);
        setSeg(0);
        break;
      default:
        setMin(25);
        setSeg(0);
        break;
    }
  }, [menu]);

  useEffect(() => {
    if (!isPlay) return;

    const interval = setInterval(() => {
      handleRemoveTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlay, handleRemoveTime]);

  return (
    <>
      <div className={`flex gap-5 text-6xl relative ${isBlur && "blur-md"}`}>
        {!isCountdown && <button onClick={handleRemoveTime}>-</button>}
        <p>
          {min < 10 ? "0" + min : min}:{seg < 10 ? "0" + seg : seg}
        </p>
        {!isCountdown && <button onClick={handleAddTime}>+</button>}
      </div>
      {isBlur ? (
        <EyeOff
          size={25}
          onClick={() => setIsBlur(!isBlur)}
          className="cursor-pointer"
        />
      ) : (
        <Eye
          size={25}
          onClick={() => setIsBlur(!isBlur)}
          className="cursor-pointer"
        />
      )}
      <ul className="flex items-center gap-5">
        {item.map((item) => (
          <li key={item.id}>
            <button onClick={() => handleClick(item.id)}>{item.icon}</button>
          </li>
        ))}
      </ul>
    </>
  );
}
