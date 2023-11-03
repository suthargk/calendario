import React, { useState } from "react";
import Switch from "../../common/Switch";

const Integration = ({ icon, id, title, description }) => {
  const [toggle, setToggle] = useState(false);

  const handleChange = () => {
    setToggle(!toggle);
  };
  return (
    <div className="border border-gray-200 p-2 rounded-md flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="border border-gray-200 rounded-md p-1">{icon}</div>
        <div className="flex flex-col text-xs">
          <span className="font-medium">{title}</span>
          <span className="text-[9px] text-gray-600">{description}</span>
        </div>
      </div>
      <div>
        <Switch checked={toggle} id={id} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Integration;
