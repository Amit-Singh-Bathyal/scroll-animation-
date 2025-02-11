"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleMouseMove = (event) => {
      let x = event.clientX / window.innerWidth;
      let y = event.clientY / window.innerHeight;
      let scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
      let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      window.scrollTo({
        left: x * scrollWidth,
        top: y * scrollHeight,
        behavior: "smooth",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-[300vw] h-[300vh] flex flex-wrap items-center justify-center">
      <div className="w-screen h-screen flex items-center justify-center text-white text-2xl font-bold bg-red-500">
        Section 1
      </div>
      <div className="w-screen h-screen flex items-center justify-center text-white text-2xl font-bold bg-yellow-400">
        Section 2
      </div>
      <div className="w-screen h-screen flex items-center justify-center text-white text-2xl font-bold bg-green-500">
        Section 3
      </div>
      <div className="w-screen h-screen flex items-center justify-center text-white text-2xl font-bold bg-blue-500">
        Section 4
      </div>
    </div>
  );
}
