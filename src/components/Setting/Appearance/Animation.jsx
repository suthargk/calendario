import React, { useState } from "react";
import Switch from "../../common/Switch";

const Animation = () => {
  const [toggle, setToggle] = useState(false);

  const handleChange = () => {
    setToggle(!toggle);
  };
  return (
    <div className="space-y-3 pt-2 flex justify-between items-center">
      <div>
        <h2 className="text-sm">Animation</h2>
        <p className="text-xs text-gray-600">Make the calendar animation.</p>
      </div>

      <div>
        <Switch id="animation" onChange={handleChange} checked={toggle} />
      </div>
    </div>
  );
};

export default Animation;
