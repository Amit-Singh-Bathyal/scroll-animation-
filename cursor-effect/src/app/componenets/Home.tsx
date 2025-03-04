"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "./Countdown";


const sponsors = [
  { type: "Title Sponsor", name: "Company A", description: "Leading industry giant.", image: "/images/bgnew5.png" },
  { type: "Gold Sponsor", name: "Company B", description: "Innovators in tech.", image: "/images/bgnew5.png" },
  { type: "Silver Sponsor", name: "Company C", description: "Revolutionizing AI.", image: "/images/bgnew5.png" },
  { type: "Bronze Sponsor", name: "Company D", description: "Your trusted partner.", image: "/images/bgnew5.png" },
];


export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);



  useEffect(() => {
    const texts = ["REALMS OF ENGINEERING", "WHERE ENGINEERING MEETS INNOVATION"]; 
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); // Typing speed

      return () => clearTimeout(timeout);
    }

    if (charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, 50); 

      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex]); 
  return (
    <div className="relative flex justify-center  text-white text-2xl font-bold w-[100vw] h-[150vh]" style={{ gridRow: "span 2" }}>
      <div className="absolute top-56 left-60 flex flex-col items-start">
        <div className="text-2xl font-semibold mb-2 text-center">Total Events</div>
        <Countdown />
      </div>
      <div className="absolute top-72 right-24 flex items-end">
        <div className="relative w-44 h-44 flex items-center justify-center rounded-full border-4 border-teal-400 p-2 text-white text-[20px] font-bold shadow-lg text-center">
          Register now for exciting events !!
        </div>

        <div className="relative -translate-x-7 hover:bg-transparent w-44 h-44 flex items-center justify-center rounded-full border-4 border-teal-400 p-2 text-white text-2xl font-bold shadow-lg text-center">
          <a href="/signup">Sign Up</a>
        </div>
      </div>

      <div className="absolute flex flex-col items-center  justify-center">
        <Image 
          className="p-4 m-4"
          src="/images/bgnew5.png"
          alt="Prodyogiki Logo"
          width={800}
          height={400}
        />
        <div className="m-2 text-bold text-7xl">PRODYOGIKI</div>
        <div className="m-2">{displayedText}<span className="animate-blink">|</span></div>

        <div className="grid grid-cols-4 grid-rows-1 gap-8 p-8 mt-8 bg-black">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="flex flex-col justify-center p-4  rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white">{sponsor.type}</h3>
          <div className="w-full h-[2px] bg-gray-400"></div>
          <p className="text-white text-center text-sm mb-2">{sponsor.description}</p>
       
          <Image src={sponsor.image} alt={sponsor.name} width={150} height={100} className="rounded-md object-contain " />
      
        </div>
      ))}
    </div>
      </div>



    </div>
  );
}
