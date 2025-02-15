'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const days = ['Day 1', 'Day 2', 'Day 3'];
const content = [
  "Day 1: Introduction to the event and ice-breaking activities.",
  "Day 2: Technical workshops and hands-on projects.",
  "Day 3: Final presentations and closing ceremony."
];

export default function HorizontalTimeline() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-screen h-[50vh] flex flex-col items-center justify-center  text-white">
      <div className="relative flex items-center w-[80%] overflow-hidden mb-10">
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 transform -translate-y-1/2" />
        
        {days.map((day, index) => (
          <div key={index} className="relative flex-1 text-center">
            {/* Clickable Circles */}
            <motion.div
              className={
                `w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer border-4 ${
                  selected === index ? 'bg-blue-500 border-blue-500 scale-110' : 'border-gray-600'
                }`
              }
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(index)}
            >
              {index + 1}
            </motion.div>
            
            {/* Labels */}
            <p className="mt-2 text-sm">{day}</p>
          </div>
        ))}
      </div>

      {/* Animated Content */}
      <motion.div
        key={selected}
        className="w-[80%] h-24 bg-gray-800 flex items-center justify-center rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg text-center px-4">{content[selected]}</p>
      </motion.div>
      
      {/* Explore Timeline Button */}
      <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md">Explore Timeline</button>
    </div>
  );
}