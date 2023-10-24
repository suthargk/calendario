import React from "react";
import { motion } from "framer-motion";

const AlertOverlay = ({ icon, title, description, footerAction, body }) => {
  const iconBgColor = icon ? icon.props.className.split("-")[1] : "";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-lg w-72 divide-y divide-gray-200 z-50 bg-white shadow-2xl"
    >
      <div className="p-4 flex flex-col items-center justify-center text-center">
        {icon && (
          <div className={`mb-2 rounded-full p-1 bg-${iconBgColor}-100`}>
            {icon}
          </div>
        )}
        <h3 className={`mb-0.5 ${title.className}`}>{title.title}</h3>
        {description && (
          <p className="text-gray-500 font-light text-sm">{description}</p>
        )}
        {body && body}
      </div>
      {footerAction}
    </div>
  );
};

export default AlertOverlay;
