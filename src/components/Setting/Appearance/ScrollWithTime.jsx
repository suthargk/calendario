import React, { useState } from "react";

import Switch from "../../common/Switch";

const ScrollWithTime = () => {
  const [toggle, setToggle] = useState(false);

  const handleChange = () => {
    setToggle(!toggle);
  };

  return (
    <div className="space-y-3 pt-2 flex justify-between items-center">
      <div>
        <h2 className="text-sm dark:text-slate-50">Scroll event list</h2>
        <p className="text-xs text-gray-600 dark:text-slate-400">
          Auto scroll event list with current time
        </p>
      </div>

      <div>
        <Switch
          id="scroll_with_time"
          onChange={handleChange}
          checked={toggle}
        />
      </div>
    </div>
  );
};

export default ScrollWithTime;
