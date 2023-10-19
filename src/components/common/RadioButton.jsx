import React from "react";

const RadioButton = ({ value, label, id, onChange, className }) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer text-gray-500 ${className}`}
    >
      <span
        className={`w-3.5 h-3.5 rounded-full  ${
          value
            ? "border-[4.5px] border-blue-500 bg-white"
            : "bg-white border border-gray-200"
        }`}
      ></span>
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
