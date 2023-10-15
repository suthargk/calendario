import React from "react";

const EventDescription = ({ description }) => {
  const htmlFormatDescription = { __html: description };

  return (
    <div>
      <h2 className="font-medium text-xs">Description</h2>
      <div
        className={`mt-2 ${
          description.length > 100 ? "overflow-auto h-48" : ""
        }`}
      >
        <p
          className="text-xs text-gray-600 p-2 break-words"
          dangerouslySetInnerHTML={htmlFormatDescription}
        />
      </div>
    </div>
  );
};

export default EventDescription;
