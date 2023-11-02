import React, { useState } from "react";
import Theme from "./Theme";
import { bgColor } from "../../../store/reducers/utils";

const getChildren = ({ value, label }) => {
  return (
    <div
      className={`h-4 w-4 rounded-full cursor-pointer p-[1px] ${
        value ? "ring-[2.5px] ring-blue-500 " : ""
      }`}
    >
      <div
        className={`${bgColor[label].light} h-full w-full rounded-full`}
      ></div>
    </div>
  );
};

const AccentColor = () => {
  const [radioButtonValue, setRadioButtonValue] = useState("blue");
  const handleChange = (value) => {
    setRadioButtonValue(value);
  };

  return (
    <div className="pt-2 space-y-3">
      <div>
        <h2 className="text-sm">Accent color</h2>
        <p className="text-xs text-gray-600">
          Select your calendar accent color
        </p>
      </div>

      <div className="flex gap-2">
        <Theme
          value={"blue" === radioButtonValue}
          onChange={() => handleChange("blue")}
        >
          {getChildren({ value: "blue" === radioButtonValue, label: "blue" })}
        </Theme>
        <Theme
          value={"rose" === radioButtonValue}
          label="rose"
          onChange={() => handleChange("rose")}
        >
          {getChildren({ value: "rose" === radioButtonValue, label: "rose" })}
        </Theme>
        <Theme
          value={"green" === radioButtonValue}
          label="green"
          onChange={() => handleChange("green")}
        >
          {getChildren({ value: "green" === radioButtonValue, label: "green" })}
        </Theme>
        <Theme
          value={"teal" === radioButtonValue}
          label="teal"
          onChange={() => handleChange("teal")}
        >
          {getChildren({ value: "teal" === radioButtonValue, label: "teal" })}
        </Theme>
        <Theme
          value={"yellow" === radioButtonValue}
          label="yellow"
          onChange={() => handleChange("yellow")}
        >
          {getChildren({
            value: "yellow" === radioButtonValue,
            label: "yellow",
          })}
        </Theme>
        <Theme
          value={"violet" === radioButtonValue}
          label="violet"
          onChange={() => handleChange("violet")}
        >
          {getChildren({
            value: "violet" === radioButtonValue,
            label: "violet",
          })}
        </Theme>
        <Theme
          value={"orange" === radioButtonValue}
          label="orange"
          onChange={() => handleChange("orange")}
        >
          {getChildren({
            value: "orange" === radioButtonValue,
            label: "orange",
          })}
        </Theme>
      </div>
    </div>
  );
};

export default AccentColor;
