"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  interface MouseMoveEvent extends MouseEvent {
    clientX: number;
    clientY: number;
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseMoveEvent) => {
      let x = event.clientX / window.innerWidth;
      let y = event.clientY / window.innerHeight;

      setScrollX(x);
      setScrollY(y);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      left: scrollX * scrollWidth,
      top: scrollY * scrollHeight,
      behavior: "instant",
    });
  }, [scrollX, scrollY]);

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
              {/* Image at Center with Zoom Animation */}
              {images[index] && (
                <div className="image-container">
                  <Image
                    src={images[index].src}
                    alt={images[index].text}
                    width={202}
                    height={202}
                    className="zoom-image"
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Help Button */}
      <div className="help-button">?</div>

      <style jsx>{`
        .image-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 202px;
          height: 202px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10; /* Ensure it's above other elements */
          transition: transform 0.3s ease-in-out;
        }

        .image-container:hover {
          transform: translate(-50%, -50%) scale(1.5); /* Zoom effect */
        }



        .help-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          overflow: hidden;
          white-space: nowrap;
          padding: 10px;
        }

        .help-button:hover {
          width: 350px;
          border-radius: 20px;
          justify-content: flex-start;
          padding-left: 15px;
          font-size: 18px;
        }

        .help-button:hover::after {
          content: "...Move mouse to explore -> <-";
        }
      `}</style>
    </>
  );
};

export default MouseScrollGrids;
