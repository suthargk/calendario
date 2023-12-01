import React, { useContext, useState } from "react";

import { AccentColorContext } from "../../../App";
import { bgColor, ringColor } from "../../../color";
import Theme from "./Theme";

const getChildren = ({ value, label, accentColor }) => {
  return (
    <div
      className={`h-4 w-4 rounded-full cursor-pointer p-[1px] ${
        value
          ? `ring-[2.5px] ${ringColor[accentColor].dark} ${ringColor[accentColor].darkMode.dark} ring-blue-500 dark:ring-blue-400`
          : ""
      }`}
    >
      <div
        className={`${bgColor[label].light} h-full w-full rounded-full`}
      ></div>
    </div>
  );
};

const AccentColor = () => {
  const { accentColor, setAccentColor } = useContext(AccentColorContext);
  const [radioButtonValue, setRadioButtonValue] = useState(accentColor);

  const handleChange = (value) => {
    setRadioButtonValue(value);
    setAccentColor(value);
    localStorage.setItem("accent_color", value);
  };

  return (
    <div className="pt-2 space-y-3">
      <div>
        <h2 className="text-sm dark:text-slate-50">Accent color</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Select your calendar accent color
        </p>
      </div>

      <div className="flex gap-2">
        <Theme
          value={"blue" === radioButtonValue}
          onChange={() => handleChange("blue")}
        >
          {getChildren({
            value: "blue" === radioButtonValue,
            label: "blue",
            accentColor,
          })}
        </Theme>
        <Theme
          value={"rose" === radioButtonValue}
          label="rose"
          onChange={() => handleChange("rose")}
        >
          {getChildren({
            value: "rose" === radioButtonValue,
            label: "rose",
            accentColor,
          })}
        </Theme>
        <Theme
          value={"green" === radioButtonValue}
          label="green"
          onChange={() => handleChange("green")}
        >
          {getChildren({
            value: "green" === radioButtonValue,
            label: "green",
            accentColor,
          })}
        </Theme>
        <Theme
          value={"teal" === radioButtonValue}
          label="teal"
          onChange={() => handleChange("teal")}
        >
          {getChildren({
            value: "teal" === radioButtonValue,
            label: "teal",
            accentColor,
          })}
        </Theme>
        <Theme
          value={"yellow" === radioButtonValue}
          label="yellow"
          onChange={() => handleChange("yellow")}
        >
          {getChildren({
            value: "yellow" === radioButtonValue,
            label: "yellow",
            accentColor,
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
            accentColor,
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
            accentColor,
          })}
        </Theme>
      </div>
    </div>
  );
};

export default AccentColor;
