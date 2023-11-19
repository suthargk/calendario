import React from "react";

const Switch = ({ id, checked, onChange }) => {
  return (
    <label htmlFor={id} className="cursor-pointer">
      <input
        id={id}
        onChange={() => onChange(!checked)}
        className="hidden"
        type="checkbox"
        name={id}
        checked={checked}
      />
      <div
        className={`flex items-center relative duration-300 w-[34px] border  rounded-full ${
          checked
            ? "bg-blue-500 border-blue-500 dark:bg-blue-400 dark:border-blue-400"
            : "bg-gray-200 border-gray-200 dark:bg-slate-600 dark:border-slate-700"
        }`}
      >
        <div
          className={`rounded-full h-4 w-4 bg-white shadow-md duration-300 transform ${
            checked ? "translate-x-full " : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
