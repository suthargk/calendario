import React, { useContext, useEffect, useState } from "react";

import { AccentColorContext } from "../../../App";
import DarkMode from "../../../assets/icons/DarkMode";
import LightDarkMode from "../../../assets/icons/LightDarkMode";
import LightMode from "../../../assets/icons/LightMode";
import { borderColor, textColor } from "../../../color";
import Theme from "./Theme";

const getChildren = ({ icon, label, value }) => {
  const { accentColor } = useContext(AccentColorContext);
  return (
    <>
      <div
        className={` border-[2.5px] overflow-hidden cursor-pointer rounded-xl h-[70px] ${
          value
            ? `${borderColor[accentColor].dark} ${borderColor[accentColor].darkMode.dark}`
            : "border-gray-100 dark:border-slate-800"
        }`}
      >
        {icon}
      </div>
      <h6
        className={`text-xs text-center mt-1 capitalize ${
          value
            ? "font-medium text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-slate-400"
        }`}
      >
        {label}
      </h6>
    </>
  );
};

const Themes = () => {
  const [radioButtonValue, setRadioButtonValue] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });
  const { accentColor } = useContext(AccentColorContext);
  const handleChange = (value) => {
    setRadioButtonValue(value);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [radioButtonValue]);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-sm dark:text-slate-50">Interface theme</h2>
        <p className="text-xs text-gray-600 dark:text-slate-400">
          Customise your calendar theme
        </p>
      </div>
      <div className="flex gap-1 h-full">
        <Theme
          className={`w-1/3 ${textColor[accentColor].dark}`}
          value={"system" === radioButtonValue}
          onChange={() => {
            localStorage.removeItem("theme");
            handleChange("system");
          }}
        >
          {getChildren({
            value: "system" === radioButtonValue,
            icon: <LightDarkMode />,
            label: "system",
          })}
        </Theme>
        <Theme
          className={`w-1/3 ${textColor[accentColor].dark}`}
          value={"light" === radioButtonValue}
          onChange={() => {
            localStorage.theme = "light";
            handleChange("light");
          }}
        >
          {getChildren({
            value: "light" === radioButtonValue,
            icon: <LightMode />,
            label: "light",
          })}
        </Theme>
        <Theme
          className={`w-1/3 ${textColor[accentColor].dark}`}
          value={"dark" === radioButtonValue}
          onChange={() => {
            localStorage.theme = "dark";
            handleChange("dark");
          }}
        >
          {getChildren({
            value: "dark" === radioButtonValue,
            icon: <DarkMode />,
            label: "dark",
          })}
        </Theme>
      </div>
    </div>
  );
};

export default Themes;
