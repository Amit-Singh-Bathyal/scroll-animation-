"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

const events = [
  {
    name: "Breach-o-Beach",
    date: "4th April",
    description: "Description for Breach-O Beach Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Chemystrey 2.O",
    date: "5th April",
    description: "Description for Chemystrey 3.0 Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Bidwiser",
    date: "6th April",
    description: "Description for Bidwiser Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Bidwiser222",
    date: "6th April",
    description: "Description for Bidwiser Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Bidwiser3333",
    date: "6th April",
    description: "Description for Bidwiser Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Bidwiser4444",
    date: "6th April",
    description: "Description for Bidwiser Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  }
];

const Display = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // Change event every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length),
    onSwipedRight: () => setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length),
    trackMouse: true,
  });

  return (
    <div className="relative w-[80vw] overflow-hidden" {...handlers}>
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(currentEventIndex % events.length) * 50}%)`, // Adjusted to 50% for 2 cards at once
        }}
      >
        {events.map((event, index) => (
          <div key={index} className="relative w-[50vw] flex-shrink-0">
            <Image
              src="Frame.svg"
              alt="frame"
              width={282}
              height={200}
              className="w-[570px]" // Adjust width if needed
            />
            <div className="absolute top-2 left-2 z-1 flex items-start space-x-2">
              <div className="bg-[#D25E5E] ml-7 mt-4 w-[0.2vw] overflow-hidden h-[10vw]"></div>
              <div>
                <div className="font-bold text-lg mt-2.5 ml-2 text-white">{event.name} </div>
                <div className="text-base ml-2 text-white">{event.date}</div>
              </div>
            </div>
            <div className="absolute top-20 w-[15vw] h-[0.25vh] bg-[#474747] ml-6"></div>
            <div className="absolute top-24 flex justify-between items-center w-full px-4">
              <div className="text-1xl w-[30vw] ml-9 text-white">
                {event.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
