"use client";
import { useEffect, useRef } from "react";
import Event from "../componenets/Event";

export default function Home() {
  const lastX = useRef<number>(0);
  const lastY = useRef<number>(0);
  const lastTime = useRef<number>(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = (event: MouseEvent) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const now = Date.now();
        const timeDiff = now - lastTime.current;

        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        const targetX = x * scrollWidth;
        const targetY = y * scrollHeight;

        const speedX = Math.abs(targetX - lastX.current) / timeDiff;
        const speedY = Math.abs(targetY - lastY.current) / timeDiff;

        const smoothingFactor = 0.01 + (speedX + speedY) * 0.005;

        lastX.current = lastX.current + (targetX - lastX.current) * smoothingFactor;
        lastY.current = lastY.current + (targetY - lastY.current) * smoothingFactor;

        window.scrollTo({
          left: lastX.current,
          top: lastY.current,
          behavior: "smooth",
        });

        lastTime.current = now;
      }, 10); 
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-[200vw] h-[200vh] grid grid-cols-3 grid-rows-3 gap-4 p-4">
      <Event />
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-yellow-400">Section 2</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-green-500">Section 3</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-blue-500">Section 4</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-purple-500">Section 5</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-pink-500">Section 6</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-orange-500">Section 7</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-teal-500">Section 8</div>
      <div className="flex items-center justify-center text-white text-2xl font-bold bg-gray-500">Section 9</div>
    </div>
  );
}
