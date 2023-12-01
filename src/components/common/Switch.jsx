import React, { useContext } from "react";

import { AccentColorContext } from "../../App";
import { bgColor, borderColor } from "../../color";

const Switch = ({ id, checked, onChange, disabled }) => {
  const { accentColor } = useContext(AccentColorContext);
  return (
    <label
      htmlFor={id}
      className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      <input
        id={id}
        onChange={() => onChange(!checked)}
        className="hidden"
        type="checkbox"
        name={id}
        checked={checked}
        disabled={disabled}
      />
      <div
        className={`flex items-center relative duration-300 w-[34px] border  rounded-full ${
          checked
            ? `${bgColor[accentColor].dark}  ${borderColor[accentColor].dark} ${bgColor[accentColor].darkMode.dark}  ${borderColor[accentColor].darkMode.dark}  `
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
