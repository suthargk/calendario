import React from "react";
import { motion } from "framer-motion";

const Tab = ({ icon, label, active, handleTab, tabActive }) => {
  return (
    <button
      onClick={() => handleTab(label)}
      style={{ padding: "6px" }}
      className={`relative flex items-center gap-1.5 w-full justify-center text-gray-400 focus:outline-2 focus:outline-blue-500 ${
        tabActive === label && "text-gray-900"
      }`}
    >
      <div className={`${tabActive === label ? "text-blue-500" : ""}`}>
        {icon}
      </div>
      <span style={{ fontSize: "15px" }}>{label}</span>
      {tabActive === label && (
        <motion.div
          layoutId="underline"
          style={{ height: 2.5, bottom: -1.5 }}
          className="absolute bg-blue-500 w-4/5 "
        ></motion.div>
      )}
    </button>
  );
};

export default Tab;
