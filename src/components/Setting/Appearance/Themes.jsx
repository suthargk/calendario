import React, { useEffect, useState } from "react";

import Theme from "./Theme";

const getChildren = ({ imgSrc, label, value }) => {
  return (
    <>
      <div
        className={` border-[2.5px] overflow-hidden cursor-pointer rounded-xl h-[64px] ${
          value
            ? "border-blue-500 dark:border-blue-400"
            : "border-gray-100 dark:border-slate-800"
        }`}
      >
        <img src={imgSrc} draggable={false} />
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
          value={"system" === radioButtonValue}
          onChange={() => {
            localStorage.removeItem("theme");
            handleChange("system");
          }}
        >
          {getChildren({
            value: "system" === radioButtonValue,
            imgSrc: "./images/light_dark.png",
            label: "system",
          })}
        </Theme>
        <Theme
          value={"light" === radioButtonValue}
          onChange={() => {
            localStorage.theme = "light";
            handleChange("light");
          }}
        >
          {getChildren({
            value: "light" === radioButtonValue,
            imgSrc: "./images/light.png",
            label: "light",
          })}
        </Theme>
        <Theme
          value={"dark" === radioButtonValue}
          onChange={() => {
            localStorage.theme = "dark";
            handleChange("dark");
          }}
        >
          {getChildren({
            value: "dark" === radioButtonValue,
            imgSrc: "./images/dark.png",
            label: "dark",
          })}
        </Theme>
      </div>
    </div>
  );
};

export default Themes;
