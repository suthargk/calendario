import React, { useContext } from "react";

import { motion } from "framer-motion";

import { AccentColorContext } from "../../../App";
import { bgColor, textColor } from "../../../color";

const Tab = ({
  icon,
  label,
  active,
  handleTab,
  tabActive,
  underLineColor,
  layoutId = "event_tabs",
  className,
}) => {
  const { accentColor } = useContext(AccentColorContext);

  return (
    <button
      onClick={() => handleTab(label)}
      className={`relative flex p-[6px] items-center w-full justify-center focus:outline-2 focus:outline-blue-500 ${
        tabActive === label
          ? "text-gray-900 dark:text-slate-50"
          : "text-gray-400 dark:text-slate-400"
      } ${className}`}
    >
      {icon && (
        <div
          className={`${
            tabActive === label ? textColor[accentColor].dark : ""
          } mr-1.5`}
        >
          {icon}
        </div>
      )}
      <span className="w-max text-[15px]">{label}</span>
      {tabActive === label && (
        <motion.div
          layoutId={layoutId}
          style={{ height: 2.5, bottom: -1.5 }}
          className={`absolute ${bgColor[accentColor].light} ${bgColor[accentColor].darkMode} w-full ${underLineColor}`}
        ></motion.div>
      )}
    </button>
  );
};

export default Tab;
