"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Home from "./componenets/Home";
import Members from "./componenets/Members";
import Register from "./componenets/Register";
import Events from "./componenets/Events";
import Gallery from "./componenets/Gallery";
import Messages from "./componenets/Messages";
import Timeline from "./componenets/Timeline";

gsap.registerPlugin(ScrollToPlugin);

const MouseScrollGrids = () => {
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const gridRef = useRef(null);

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
      targetX.current += (cursorX.current - targetX.current) * 0.1; 
      targetY.current += (cursorY.current - targetY.current) * 0.1;

      const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      gsap.to(window, {
        duration: 1.5, 
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

  useEffect(() => {

    gsap.fromTo(
      gridRef.current,
      { scale: 0.5, x: "-25%", y: "-25%" },
      {
        scale: 1,           
        x: "0%",    
        y: "0%",      
        duration: 2,         
        delay: 1,            
        ease: "power2.out",  
      }
    );
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid md:grid-cols-3 md:grid-rows-3 grid-cols-1 grid-rows-1 overflow-hidden bg-black"
      style={{
        width: "200vw",
        height: "200vh",
        display: "grid",
        gridTemplateColumns: "50vw 100vw 50vw", 
        gridTemplateRows: "75vh 75vh 50vh",
        gap: "5px",
      }}
    >
      <Members />
      <Home />
      <Events />
      <Register />
      <Gallery />
      <Messages />
      <Timeline />
      <div className='w-[50vw] h-[50vh]'>example</div>
    </div>
  );
};

export default MouseScrollGrids;
