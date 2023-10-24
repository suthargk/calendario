import React, { useState } from "react";
import { motion } from "framer-motion";

const RadioButton = ({ value, label, id, onChange, className }) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer text-gray-500 ${className}`}
    >
      <motion.div
        animate={value ? { scale: 1.15 } : { scale: 1 }}
        transition={{
          type: "spring",
          velocity: 5,
          mass: 0.5,
        }}
        className={`w-3.5 h-3.5 rounded-full  ${
          value
            ? "border-[4.5px] border-blue-500 bg-white"
            : "bg-white border border-gray-200"
        }`}
      />
      <input
        className="hidden"
        id={id}
        type="radio"
        checked={value}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
