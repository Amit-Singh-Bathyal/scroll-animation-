"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; 

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, 
  };

  return (
    <div className="min-h-screen flex flex-col pt-5 items-center lg:pt-12 relative">
      
      <div className="flex items-center justify-center w-[90%] max-w-[400px] sm:mb-12 mt-16 mb-6">
        <h2 className="text-white text-4xl sm:text-4xl font-black">Sign up</h2>
      </div>

      
      <motion.div
        className="p-4 mx-2 sm:border-[3px] bg-opacity-20 bg-slate-200 border-[#1B7774] w-[90%] max-w-[400px] rounded-3xl h-auto flex flex-col justify-center items-center"
        variants={cardVariants}
        initial="hidden" 
        animate="visible" 
      >
        {["name", "email", "password"].map((field, index) => (
          <div key={index} className="w-full max-w-[350px] mb-11 sm:mb-9">
            <label
              htmlFor={field}
              className="block text-[#474747] font-semibold sm:font-bold text-lg sm:text-xl mb-2"
            >
              {field === "name"
                ? "Username" 
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative h-[60px] sm:h-[70px]">
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="mt-2 p-2 pl-4 sm:pl-6 border-b-[1px] border-[3px] border-[#1B7774] bg-[#1B6665] opacity-80 text-white rounded-2xl w-full h-full placeholder-white"
                placeholder={
                  field === "name"
                    ? "Enter your username" 
                    : `Enter your ${field}`
                }
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 px-5 border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl h-16 w-44 hover:scale-105 transition delay-100 duration-300 ease-in-out"
        >
          Login
        </button>

        <div className="mt-6 text-white text-base">
          Already have an account?{" "}
          <a href="/login" className="text-[#0c4644] font-semibold hover:underline">
            Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;