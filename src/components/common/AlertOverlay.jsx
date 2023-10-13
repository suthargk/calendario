import React from "react";

const AlertOverlay = ({
  icon,
  title,
  description,
  footerAction,
  setIsAlertOverlayOpen,
  setIsLoading,
}) => {
  const iconBgColor = icon.props.className.split("-")[1];
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsAlertOverlayOpen(false);
        setIsLoading(false);
      }}
      style={{ background: "rgba(0,0,0,.1)" }}
      className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg w-72 divide-y divide-gray-200 z-50 bg-white shadow-2xl"
      >
        <div className="p-4 flex flex-col items-center justify-center text-center">
          <div className={`mb-2 rounded-full p-1 bg-${iconBgColor}-100`}>
            {icon}
          </div>
          <h3 className="font-medium mb-0.5">{title}</h3>
          <p className="text-gray-500 font-light text-sm">{description}</p>
        </div>
        {footerAction}
      </div>
    </div>
  );
};

export default AlertOverlay;
