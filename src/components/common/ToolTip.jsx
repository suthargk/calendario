import React from "react";
import { motion } from "framer-motion";

const ToolTip = ({ direction = "top", text }) => {
  let parentDiv = "left-1/2 -translate-x-1/2";
  let motionDiv = "";
  let chevronPostion = "";
  let initial = { y: 0 };
  let animate = { y: 2 };
  switch (direction) {
    case "right": {
      parentDiv = "top-1/2 -translate-y-1/2 right-7";
      motionDiv = "flex items-center flex-row-reverse";
      chevronPostion = "rotate-90 mx-0";
      initial = { x: 4 };
      animate = { x: 0 };
      break;
    }
    case "left": {
      parentDiv = "top-1/2 -translate-y-1/2 left-5";
      motionDiv = "flex items-center flex-row ";
      chevronPostion = "-rotate-90 mx-0";
      initial = { x: 0 };
      animate = { x: 4 };
      break;
    }

    case "bottom": {
      motionDiv = "flex flex-col-reverse items-center";
      chevronPostion = "rotate-180 mx-0";
      initial = { y: 2 };
      animate = { y: 0 };
      break;
    }

    default: {
      motionDiv = "";
      chevronPostion = "";
      initial = { y: 0 };
      animate = { y: 2 };
    }
  }

  return (
    <div className={`absolute z-50 shadow-2xl ${parentDiv} `}>
      <motion.div
        className={motionDiv}
        initial={{ opacity: 0, ...initial }}
        animate={{ opacity: 1, ...animate }}
        transition={{ delay: 0.5, type: "spring", mass: 0.5, velocity: 1 }}
      >
        <div
          style={{ clipPath: "polygon(50% 40%, 0% 100%, 100% 100%)" }}
          className={`mx-auto flex justify-end h-2 w-2 bg-gray-900 ${chevronPostion}`}
        ></div>
        <div
          style={{ fontSize: "10px" }}
          className={`px-1 py-0.5 w-max rounded font-light bg-gray-900 text-white`}
        >
          {text}
        </div>
      </motion.div>
    </div>
  );
};

export default ToolTip;
