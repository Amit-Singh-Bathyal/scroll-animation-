"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const images = [
  { src: "/images/logo_iste.png", text: "WELCOME TO PRODY2K25" },
  { src: "/images/logo_prody.png", text: "Prody" },
  { src: "/images/card.png", text: "Card 1" },
  { src: "/images/card.png", text: "Card 2" },
  { src: "/images/card.png", text: "Card 3" },
  { src: "/images/card.png", text: "Card 4" },
  { src: "/images/card.png", text: "Card 5" },
  { src: "/images/card.png", text: "Card 6" },
  { src: "/images/card.png", text: "Card 7" },
];

const MouseScrollGrids = () => {
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.current = event.clientX / window.innerWidth;
      cursorY.current = event.clientY / window.innerHeight;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const smoothScroll = () => {
      targetX.current += (cursorX.current - targetX.current) * 0.05;
      targetY.current += (cursorY.current - targetY.current) * 0.05;

      const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      //this thing ..........................
      gsap.to(window, {
        duration: 1,
        ease: "power2.out",
        scrollTo: {
          x: targetX.current * scrollWidth,
          y: targetY.current * scrollHeight,
        },
      });

      requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          width: "300vw",
          height: "300vh",
          display: "grid",
          gridTemplateColumns: "repeat(3, 100vw)",
          gridTemplateRows: "repeat(3, 100vh)",
        }}
      >
        {["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#ff9f1c", "#d7263d", "#3a86ff", "#8338ec"].map(
          (color, index) => (
            <div
              key={index}
              className="section"
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                fontWeight: "bold",
                color: "white",
                backgroundColor: color,
                border: "2px solid white",
                position: "relative",
              }}
            >
              {images[index] && (
                <div className="image-container">
                  <Image
                    src={images[index].src}
                    alt={images[index].text}
                    width={150}
                    height={150}
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>

      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden; /* 🔥 Hides scrollbars */
        }

        .image-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: transform 0.3s ease-in-out;
        }

        .image-container:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }
      `}</style>
    </>
  );
};

export default MouseScrollGrids;
