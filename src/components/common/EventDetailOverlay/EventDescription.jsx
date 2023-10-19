import React from "react";

const EventDescription = ({ description }) => {
  const htmlFormatDescription = { __html: description };

  return (
    <div className="">
      <h2 className="font-medium text-xs">Description</h2>
      <div
        className={`mt-2 bg-gray-50 rounded-lg ${
          description.length > 100 ? "overflow-auto max-h-[150px]" : ""
        }`}
      >
        <p
          className="text-xs text-gray-700 p-2 break-words"
          dangerouslySetInnerHTML={htmlFormatDescription}
        />
      </div>
    </div>
  );
};

export default EventDescription;
