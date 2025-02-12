"use client";

import { useEffect, useRef, useState } from "react";

const SmoothCanvasNavigation = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const animate = () => {
      if (containerRef.current && isFullScreen) {
        currentOffset.current.x +=
          (targetOffset.current.x - currentOffset.current.x) * 0.6;
        currentOffset.current.y +=
          (targetOffset.current.y - currentOffset.current.y) * 1;

        containerRef.current.style.transform = `translate(-${currentOffset.current.x}vw, -${currentOffset.current.y}vh)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [isFullScreen]);

  // Mouse-controlled canvas movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isFullScreen) {
        const x = (event.clientX / window.innerWidth) * 100;
        const y = (event.clientY / window.innerHeight) * 100;

        targetOffset.current.x = (x / 100) * 200;
        targetOffset.current.y = (y / 100) * 200;
      }

      // Update cursor position for custom cursor
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    if (isFullScreen) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFullScreen]);

  // Toggle full-screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

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

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // Disable scrolling
        cursor: isFullScreen ? "none" : "default",
        position: "relative",
      }}
    >
      {/* Full-screen toggle button */}
      <button
        onClick={toggleFullScreen}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isFullScreen ? "Grid View" : "Full Screen"}
      </button>

      {/* Canvas container */}
      <div
        ref={containerRef}
        style={{
          width: isFullScreen ? "300vw" : "100vw",
          height: isFullScreen ? "300vh" : "100vh",
          display: "grid",
          gridTemplateColumns: isFullScreen ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
          gridTemplateRows: isFullScreen ? "repeat(3, 1fr)" : "repeat(3, 1fr)",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 2s ease",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="section"
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "white",
              transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              style={{
                width: "60%",
                height: "90%",
                marginTop: "-40px",
                objectFit: "contain",
              }}
            />
            <p style={{ marginTop: "-30px", color: "black" }}>{image.text}</p>
          </div>
        ))}
      </div>

      {/* Custom cursor */}
      {isFullScreen && (
        <div
          style={{
            position: "fixed",
            top: cursorPosition.y,
            left: cursorPosition.x,
            width: "20px",
            height: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            pointerEvents: "none",
            transform: "translate(-100%, -100%)",
            zIndex: 1000,
            transition: "transform 0.1s ease",
          }}
        ></div>
      )}

      {/* Parallax background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, #f0f5f5, #d0dee7)",
          zIndex: -1,
          transform: `translateY(${cursorPosition.y * 0.05}px)`,
          transition: "transform 0.1s ease",
        }}
      ></div>
    </div>
  );
};

export default SmoothCanvasNavigation;