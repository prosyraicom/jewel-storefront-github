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
  const [animatingHours, setAnimatingHours] = useState(false);
  const [animatingMinutes, setAnimatingMinutes] = useState(false);
  const [animatingSeconds, setAnimatingSeconds] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        // Only animate seconds
        setAnimatingSeconds(true);
        setTimeout(() => {
          setSeconds(seconds - 1);
          setAnimatingSeconds(false);
        }, 300);
      } else if (minutes > 0) {
        // Need to animate both minutes and seconds
        setAnimatingMinutes(true);
        setAnimatingSeconds(true);
        setTimeout(() => {
          setMinutes(minutes - 1);
          setSeconds(59);
          setAnimatingMinutes(false);
          setAnimatingSeconds(false);
        }, 300);
      } else if (hours > 0) {
        // Need to animate all three
        setAnimatingHours(true);
        setAnimatingMinutes(true);
        setAnimatingSeconds(true);
        setTimeout(() => {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
          setAnimatingHours(false);
          setAnimatingMinutes(false);
          setAnimatingSeconds(false);
        }, 300);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);

  // Format numbers to always show two digits
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center">
        <div
          className="relative bg-black text-white text-center px-1 mx-1"
          style={{ minWidth: "24px" }}
        >
          <span className={`block ${animatingHours ? "animate-slide-up" : ""}`}>
            {formatNumber(hours)}
          </span>
        </div>
        <div
          className="relative bg-black text-white text-center px-1 mx-1"
          style={{ minWidth: "24px" }}
        >
          <span
            className={`block ${animatingMinutes ? "animate-slide-up" : ""}`}
          >
            {formatNumber(minutes)}
          </span>
        </div>
        <div
          className="relative bg-black text-white text-center px-1 mx-1"
          style={{ minWidth: "24px" }}
        >
          <span
            className={`block ${animatingSeconds ? "animate-slide-up" : ""}`}
          >
            {formatNumber(seconds)}
          </span>
        </div>
      </div>
      <div className="flex text-xs text-white">
        <span
          className="mx-1"
          style={{ minWidth: "24px", textAlign: "center" }}
        >
          HR
        </span>
        <span
          className="mx-1"
          style={{ minWidth: "24px", textAlign: "center" }}
        >
          MIN
        </span>
        <span
          className="mx-1"
          style={{ minWidth: "24px", textAlign: "center" }}
        >
          SEC
        </span>
      </div>
    </div>
  );
}
