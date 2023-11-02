import React from "react";

const EventCardDetailItem = ({ icon, children, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {icon && (
        <div className="rounded-full bg-white p-1 border border-gray-200 dark:border-slate-50 self-start dark:bg-slate-700">
          {icon}
        </div>
      )}
      {children}
    </div>
  );
};

export default EventCardDetailItem;
