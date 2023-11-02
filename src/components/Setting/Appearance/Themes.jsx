import React, { useState } from "react";
import Theme from "./Theme";

const getChildren = ({ imgSrc, label, value }) => {
  return (
    <>
      <div
        className={`border-[2.5px] overflow-hidden cursor-pointer rounded-xl h-[72px] ${
          value ? "border-blue-500" : "border-gray-100"
        }`}
      >
        <img src={imgSrc} draggable={false} />
      </div>
      <span className="text-xs">{label}</span>
    </>
  );
};

const Themes = () => {
  const [radioButtonValue, setRadioButtonValue] = useState("System");
  const handleChange = (value) => {
    setRadioButtonValue(value);
  };

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-sm">Interface theme</h2>
        <p className="text-xs text-gray-600">Customise your calendar theme</p>
      </div>
      <div className="flex gap-1 h-full">
        <Theme
          value={"System" === radioButtonValue}
          onChange={() => handleChange("System")}
        >
          {getChildren({
            value: "System" === radioButtonValue,
            imgSrc: "./images/light_dark.png",
            label: "System",
          })}
        </Theme>
        <Theme
          value={"Light" === radioButtonValue}
          onChange={() => handleChange("Light")}
        >
          {getChildren({
            value: "Light" === radioButtonValue,
            imgSrc: "./images/light.png",
            label: "Light",
          })}
        </Theme>
        <Theme
          value={"Dark" === radioButtonValue}
          onChange={() => handleChange("Dark")}
        >
          {getChildren({
            value: "Dark" === radioButtonValue,
            imgSrc: "./images/dark.png",
            label: "Dark",
          })}
        </Theme>
      </div>
    </div>
  );
};

export default Themes;
