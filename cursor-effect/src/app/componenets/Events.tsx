import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const events = [
  { id: 1, title: "Event 1", image: "/images/glider.png" },
  { id: 2, title: "Event 2", image: "/images/image.png" },
  { id: 3, title: "Event 3", image: "/images/1.jpeg" },
];

export default function Events() {
  const [index, setIndex] = useState(0);

  // Auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % events.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + events.length) % events.length);

  return (
    <div className="w-[50vw] h-[75vh flex flex-col items-center justify-center space-y-4 p-4">
      {/* Carousel Window */}
      <div className="relative w-[30vw] h-[60vh] overflow-hidden rounded-2xl shadow-lg border-2 border-[#00a3a3] flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={events[index].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <Image
              src={events[index].image}
              alt={events[index].title}
              width={640} // Set width manually
              height={480} // Set height manually
              className="rounded-2xl object-cover w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left & Right Buttons */}
      <div className="flex space-x-4">
        <button onClick={prevSlide} className="px-4 py-2 bg-[#00a3a3] text-white rounded-lg shadow-lg hover:bg-[#008080]">
          ◀ Prev
        </button>
        <button onClick={nextSlide} className="px-4 py-2 bg-[#00a3a3] text-white rounded-lg shadow-lg hover:bg-[#008080]">
          Next ▶
        </button>
      </div>

      {/* Register Button */}
      <button className="mt-4 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400">
        Register Now
      </button>

      {/* Text Section */}
      <div className="mt-4 text-white text-center w-[40vw]">
        <p>
          Join us for an exciting series of events! Participate, learn, and showcase your skills. Register now and be a
          part of something amazing.
        </p>
      </div>
    </div>
  );
}
