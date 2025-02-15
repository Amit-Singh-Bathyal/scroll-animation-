"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "./Countdown";

export default function Home() {
  const texts = ["REALMS OF ENGINEERING", "WHERE ENGINEERING MEETS INNOVATION"];
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); // Typing speed

      return () => clearTimeout(timeout);
    }

    if (charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, 50); // Deleting speed

      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className="relative flex items-center justify-center text-white text-2xl font-bold w-[100vw] h-[150vh]" style={{ gridRow: "span 2" }}>
      <div className="absolute top-56 left-60 flex flex-col items-start">
       

        <div className="text-3xl font-semibold mb-2 text-center">Total Events</div>
        <Countdown / >
      </div>
      <div className="absolute top-72 right-24 flex items-end">
      <div className="relative w-52 h-52 flex items-center justify-center rounded-full border-4 border-teal-400 p-2 text-white text-2xl font-bold shadow-lg text-center">
        Register now for exciting events !!
      </div>
      <div className="relative -translate-x-7 hover:bg-slate-500 w-52 h-52 flex items-center justify-center rounded-full border-4 border-teal-400 p-2 text-white text-3xl font-bold shadow-lg text-center">
        Sign Up
      </div>
        </div>

      <div className="absolute flex flex-col items-center justify-center">
        <Image 
          className="p-4 m-4"
          src="/prodylogo.png"
          alt="Prodyogiki Logo"
          width={500}
          height={300}
        />
        <div className="m-2 text-bold text-7xl">PRODYOGIKI</div>
        <div className="m-2">{displayedText}<span className="animate-blink">|</span></div>
      </div>
    </div>
  );
}
