import React from "react";

import { motion } from "framer-motion";

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
          className={`${tabActive === label ? "text-blue-500 " : ""} mr-1.5`}
        >
          {icon}
        </div>
      )}
      <span className="w-max text-[15px]">{label}</span>
      {tabActive === label && (
        <motion.div
          layoutId={layoutId}
          style={{ height: 2.5, bottom: -1.5 }}
          className={`absolute bg-blue-500 w-full ${underLineColor}`}
        ></motion.div>
      )}
    </button>
  );
};

export default Tab;
