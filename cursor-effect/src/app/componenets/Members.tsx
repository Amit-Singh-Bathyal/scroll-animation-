"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const Members = () => {
  const [hovered, setHovered] = useState(false);

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
    {/* Image */}
    <Image
      src="/images/1.jpeg"
      alt="Team"
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 ease-out"
    />

    {/* Hover Overlay */}
    {hovered && (
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-[#006666]/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-white text-start text-3xl font-bold tracking-wider -translate-x-11 translate-y-60">
          Team Members
        </h2>
      </motion.div>
    )}
  </motion.div>

  {/* Text Below Image */}
  <div className="w-[20vw] mt-4 text-white text-center">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius iure accusamus at aliquid a aspernatur!
  </div>
</div>
  )
}
export default Members;
