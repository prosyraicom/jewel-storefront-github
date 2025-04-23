"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
}

export default function Timer({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
}: TimerProps) {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);

  // Format numbers to always show two digits
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <span className="inline-flex items-center font-bold">
      <div className="flex flex-col items-center mx-1">
        <span className="bg-white text-black rounded-sm px-2 py-1">
          {formatNumber(hours)}
        </span>
        <span className="text-xs mt-0.5">HR</span>
      </div>
      <span className="text-white mx-0.5">:</span>
      <div className="flex flex-col items-center mx-1">
        <span className="bg-white text-black rounded-sm px-2 py-1">
          {formatNumber(minutes)}
        </span>
        <span className="text-xs mt-0.5">MIN</span>
      </div>
      <span className="text-white mx-0.5">:</span>
      <div className="flex flex-col items-center mx-1">
        <span className="bg-white text-black rounded-sm px-2 py-1">
          {formatNumber(seconds)}
        </span>
        <span className="text-xs mt-0.5">SEC</span>
      </div>
    </span>
  );
}
