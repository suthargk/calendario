import React from "react";
import SpinnerIcon from "../../assets/icons/SpinnerIcon";

const Loader = ({ className, ...rest }) => {
  return (
    <div
      className={`flex justify-center items-center h-full w-full ${className}`}
      {...rest}
    >
      <SpinnerIcon width={40} height={40} />
    </div>
  );
};

export default Loader;
