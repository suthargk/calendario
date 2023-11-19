import React from "react";

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
            ? "border-[4.5px] border-blue-500 bg-white dark:shadow-[rgb(59,130,246)_0px_0px_8px_1px]"
            : "bg-white border border-gray-200 dark:bg-slate-800 dark:border-slate-700"
        }`}
      />
      <input
        className="hidden"
        id={id}
        type="radio"
        checked={value}
        name={id}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
