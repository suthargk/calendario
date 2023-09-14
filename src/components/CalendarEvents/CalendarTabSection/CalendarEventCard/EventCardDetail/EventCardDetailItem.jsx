import React from "react";

const EventCardDetailItem = ({ icon, children, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="rounded-full bg-white p-1 border border-gray-200 self-start">
        {icon}
      </div>
      {children}
    </div>
  );
};

export default EventCardDetailItem;
