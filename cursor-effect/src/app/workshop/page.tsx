"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

const cards = [
  {
    id: 1,
    img: "/ws1.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla, neque iusto libero aliquid, enim magni, corporis quam ullam molestiae odit possimus eaque ex!",
    title: "WORKSHOP 1",
    date: "7TH FEB",
  },
  {
    id: 2,
    img: "/ws2.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla, neque iusto libero aliquid, enim magni, corporis quam ullam molestiae odit possimus eaque ex!",
    title: "WORKSHOP 2",
    date: "8TH FEB",
  },
  {
    id: 3,
    img: "/ws2.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla, neque iusto libero aliquid, enim magni, corporis quam ullam molestiae odit possimus eaque ex!",
    title: "WORKSHOP 3",
    date: "8TH FEB",
  },
];

const WorkshopSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCardChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length),
    onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length),
    trackMouse: true,
  });

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat bg-black"
      {...handlers}
    >
      {/* Card Slider */}
      <div className="mt-10 relative w-[351px] h-[438px] lg:w-[500px] lg:h-[600px] overflow-hidden rounded-[22px] transition-transform duration-300 ease-in-out transform hover:scale-105">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[351px] h-[438px] lg:w-[500px] lg:h-[600px] p-[2px] rounded-[22px] "
              style={{
                background: "linear-gradient(45deg, #2A2E2E, #466262)",
              }}
            >
              <div className="flex flex-col items-center bg-[#121212] opacity-80 rounded-[22px] w-full h-full p-4">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={200}
                  height={200}
                  className="mt-4 mb-4 object-cover w-40 h-40 lg:w-56 lg:h-56"
                />
                <div className="text-center text-sm lg:text-base text-white mx-4">
                  {card.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-4">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            } cursor-pointer`}
            onClick={() => handleCardChange(index)}
          />
        ))}
      </div>

      {/* Title, Date, and Button */}
      <div className="mt-10 text-center">
        <div className="text-white font-bold text-2xl lg:text-4xl">
          {cards[currentIndex].title}
        </div>
        <div className="text-white font-bold mt-6 text-lg lg:text-2xl mb-6">
          {cards[currentIndex].date}
        </div>

        <div
          className="mt-6 text-black px-10 py-3 text-base lg:text-lg rounded-full cursor-pointer transition-transform transform hover:scale-110"
          style={{
            background: "linear-gradient(0deg, #8BDBD8, #70C6F6)",
          }}
        >
          Register Now
        </div>
      </div>
    </div>
  );
};

export default WorkshopSlider;