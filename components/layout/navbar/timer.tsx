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

  // Track animation states for individual digits
  const [animatingHoursTens, setAnimatingHoursTens] = useState(false);
  const [animatingHoursOnes, setAnimatingHoursOnes] = useState(false);
  const [animatingMinutesTens, setAnimatingMinutesTens] = useState(false);
  const [animatingMinutesOnes, setAnimatingMinutesOnes] = useState(false);
  const [animatingSecondsTens, setAnimatingSecondsTens] = useState(false);
  const [animatingSecondsOnes, setAnimatingSecondsOnes] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        // Determine which digits need to animate
        const currentSecondsTens = Math.floor(seconds / 10);
        const nextSecondsTens = Math.floor((seconds - 1) / 10);

        // Always animate ones digit
        setAnimatingSecondsOnes(true);

        // Only animate tens digit if it's changing
        if (currentSecondsTens !== nextSecondsTens) {
          setAnimatingSecondsTens(true);
        }

        setTimeout(() => {
          setSeconds(seconds - 1);
          setAnimatingSecondsOnes(false);
          setAnimatingSecondsTens(false);
        }, 300);
      } else if (minutes > 0) {
        // For minutes transition
        const willAnimateMinutesTens = minutes % 10 === 0;

        // Always animate seconds digits on rollover
        setAnimatingSecondsOnes(true);
        setAnimatingSecondsTens(true);

        // For minutes, only animate the needed digits
        setAnimatingMinutesOnes(true);
        if (willAnimateMinutesTens) {
          setAnimatingMinutesTens(true);
        }

        setTimeout(() => {
          setMinutes(minutes - 1);
          setSeconds(59);
          setAnimatingSecondsOnes(false);
          setAnimatingSecondsTens(false);
          setAnimatingMinutesOnes(false);
          setAnimatingMinutesTens(false);
        }, 300);
      } else if (hours > 0) {
        // For hours transition
        const willAnimateHoursTens = hours % 10 === 0;

        // Always animate seconds and minutes digits on rollover
        setAnimatingSecondsOnes(true);
        setAnimatingSecondsTens(true);
        setAnimatingMinutesOnes(true);
        setAnimatingMinutesTens(true);

        // For hours, only animate the needed digits
        setAnimatingHoursOnes(true);
        if (willAnimateHoursTens) {
          setAnimatingHoursTens(true);
        }

        setTimeout(() => {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
          setAnimatingSecondsOnes(false);
          setAnimatingSecondsTens(false);
          setAnimatingMinutesOnes(false);
          setAnimatingMinutesTens(false);
          setAnimatingHoursOnes(false);
          setAnimatingHoursTens(false);
        }, 300);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hours, minutes, seconds]);

  // Split numbers into tens and ones digits
  const getTensDigit = (num: number) => Math.floor(num / 10);
  const getOnesDigit = (num: number) => num % 10;

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center">
        <div
          className="flex bg-black text-white text-center mx-1"
          style={{ minWidth: "24px" }}
        >
          <span
            className={`block text-sm ${animatingHoursTens ? "animate-slide-up" : ""}`}
          >
            {getTensDigit(hours)}
          </span>
          <span
            className={`block text-sm ${animatingHoursOnes ? "animate-slide-up" : ""}`}
          >
            {getOnesDigit(hours)}
          </span>
        </div>
        <div
          className="flex bg-black text-white text-center mx-1"
          style={{ minWidth: "24px" }}
        >
          <span
            className={`block text-sm ${animatingMinutesTens ? "animate-slide-up" : ""}`}
          >
            {getTensDigit(minutes)}
          </span>
          <span
            className={`block text-sm ${animatingMinutesOnes ? "animate-slide-up" : ""}`}
          >
            {getOnesDigit(minutes)}
          </span>
        </div>
        <div
          className="flex bg-black text-white text-center mx-1"
          style={{ minWidth: "24px" }}
        >
          <span
            className={`block text-sm ${animatingSecondsTens ? "animate-slide-up" : ""}`}
          >
            {getTensDigit(seconds)}
          </span>
          <span
            className={`block text-sm ${animatingSecondsOnes ? "animate-slide-up" : ""}`}
          >
            {getOnesDigit(seconds)}
          </span>
        </div>
      </div>
      <div className="flex text-xs text-white">
        <span
          className="mx-2"
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
