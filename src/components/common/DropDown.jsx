import React, { useState } from "react";
import { createPortal } from "react-dom";

const DropDown = ({ options }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(() =>
    options.find((option) => option.default === true)
  );

  return (
    <div className="relative">
      {isDropDownOpen &&
        createPortal(
          <div
            onClick={() => setIsDropDownOpen(false)}
            className="absolute top-0 left-0 bottom-0 right-0"
          ></div>,
          document.querySelector(".app")
        )}
      <div
        className="border border-gray-300 p-1 pl-2 text-sm w-1/2 rounded-md"
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        {selectedValue.title}
      </div>
      {isDropDownOpen && (
        <div className="z-10 absolute shadow-md top-0 left-0 border border-gray-200 rounded-md w-1/2 bg-white max-h-[120px] overflow-auto ">
          {options.map((option) => {
            return (
              <div
                onClick={() => {
                  setSelectedValue(option);
                  setIsDropDownOpen(false);
                }}
                className="hover:bg-blue-200 p-1 pl-2 text-sm cursor-pointer "
              >
                {option.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
