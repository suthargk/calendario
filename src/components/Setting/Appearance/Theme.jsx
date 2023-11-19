import React from "react";

const Theme = ({ id, value, children, onChange, className }) => {
  return (
    <label htmlFor={id} className={className}>
      <input
        id={id}
        type="radio"
        className="hidden"
        checked={value}
        onChange={onChange}
        name={id}
      />
      {children}
    </label>
  );
};

export default Theme;
