import React from "react";
import SpinnerIcon from "../../assets/icons/SpinnerIcon";

const Loader = ({ className, ...rest }) => {
  return (
    <div
      className={`flex justify-center items-center h-full w-full ${className}`}
      {...rest}
    >
      <SpinnerIcon width={30} height={30} className="fill-gray-500" />
    </div>
  );
};

export default Loader;
