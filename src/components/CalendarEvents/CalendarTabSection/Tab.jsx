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
}) => {
  return (
    <button
      onClick={() => handleTab(label)}
      style={{ padding: "6px" }}
      className={`relative flex items-center gap-1.5 w-full justify-center text-gray-400 focus:outline-2 focus:outline-blue-500 ${
        tabActive === label && "text-gray-900 dark:text-slate-50"
      }`}
    >
      {icon && (
        <div className={`${tabActive === label ? "text-blue-500 " : ""}`}>
          {icon}
        </div>
      )}
      <span style={{ fontSize: "15px" }}>{label}</span>
      {tabActive === label && (
        <motion.div
          layoutId={layoutId}
          style={{ height: 2.5, bottom: -1.5 }}
          className={`absolute bg-blue-500 w-4/5 ${underLineColor}`}
        ></motion.div>
      )}
    </button>
  );
};

export default Tab;
