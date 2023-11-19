import React from "react";

const Location = ({ location }) => {
  return (
    <div>
      <h2 className="font-medium text-xs">Location</h2>
      <p className="text-gray-600 text-sm dark:text-slate-400">{location}</p>
    </div>
  );
};

export default Location;
