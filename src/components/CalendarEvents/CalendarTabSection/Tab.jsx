import React from "react";

const Tab = ({ icon, label, active, handleTab, tabActive }) => {
  return (
    <div
      onClick={() => handleTab(label)}
      className={`relative flex items-center gap-1.5 p-2 w-full justify-center cursor-pointer text-gray-400 ${
        tabActive === label && "text-gray-900"
      }`}
    >
      <div className={`${tabActive === label ? "text-blue-500" : ""}`}>
        {icon}
      </div>
      <span className="">{label}</span>
      {tabActive === label && (
        <span
          style={{ height: 2.5, bottom: -1.5 }}
          className="absolute left-1/2 -translate-x-1/2 bg-blue-500 w-4/5 "
        ></span>
      )}
    </div>
  );
};

export default Tab;
