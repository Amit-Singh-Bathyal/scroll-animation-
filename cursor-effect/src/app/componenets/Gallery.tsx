"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/1.jpeg",
  "/images/workshop.png",
];

const Gallery = () => {
  const [hovered, setHovered] = useState(false);
  const [index, setIndex] = useState(0);

  // Auto-change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[50vw] h-[75vh] flex flex-col items-center justify-center gap-4">
      {/* Image Card */}
      <motion.div
        className="h-[50vh] w-[20vw] relative overflow-hidden rounded-2xl shadow-lg cursor-pointer border-2 border-[#00a3a3]"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated Image Change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-full"
          >
            <Image
              src={images[index]}
              alt="Team"
              fill
              className="object-cover transition-transform duration-500 ease-out"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover Overlay */}
        {hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-[#006666]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          </motion.div>
        )}
      </motion.div>

      <div className="w-[20vw] mt-4 text-white text-center text-3xl">
        Workshops
      </div>
      <div className="w-[20vw] mt-2 text-white text-center">
        Improve your skills by participating in exciting workshop!!
      </div>
    </div>
  );
};

export default Gallery;
