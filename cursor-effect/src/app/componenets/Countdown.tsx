"use client";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      setTimeout(() => {
        setCount(0);
        setIsPaused(false);
      }, 3000); // Hold at 10 for 3 seconds
      return;
    }

    if (count < 10) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 50); // Adjust speed (200ms per count)

      return () => clearTimeout(timer);
    }

    setIsPaused(true);
  }, [count, isPaused]);

  return (
    <div className="flex items-center justify-center h-[20vh] ml-8 bg-transparent m-2">
      <div className="hover:scale-105 hover:cursor-pointer relative w-36 h-36 flex items-center justify-center rounded-full border-4 border-teal-400 text-white text-5xl font-bold shadow-lg">
        {count}
      </div>
    </div>
  );
}
