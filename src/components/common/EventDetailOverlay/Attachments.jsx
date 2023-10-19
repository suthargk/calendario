import React, { useState } from "react";

const Attachments = ({ attachments }) => {
  const [fileAttachment, setFileAttachments] = useState(() => {
    return attachments.length > 5
      ? { listAttachments: attachments.slice(0, 5), showMoreButton: true }
      : { listAttachments: attachments, showMoreButton: false };
  });

  const handleSeeMore = () => {
    setFileAttachments((prev) => {
      return { ...prev, listAttachments: attachments, showMoreButton: false };
    });
  };

  return (
    <div>
      <h2 className="font-medium text-xs">
        <span>Attachments </span>
        <span className="font-semibold text-gray-500">
          ({attachments.length})
        </span>
      </h2>

      <ul className="flex flex-wrap gap-1 mt-2">
        {fileAttachment.listAttachments.map((attachment) => {
          return (
            <li key={attachment.id}>
              <a
                target="__blank"
                href={attachment.fileUrl}
                className="flex items-center gap-1 rounded-full text-xs border border-gray-200 px-[3.5px] py-0.5 text-gray-700 duration-300 hover:bg-gray-50"
              >
                <img
                  src={attachment.iconLink}
                  className="rounded-full w-[13px] h-[13px]"
                />

                <span>{attachment.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
      {fileAttachment.showMoreButton ? (
        <button
          onClick={handleSeeMore}
          className="text-blue-500 text-xs mt-2 underline"
        >
          See more
        </button>
      ) : null}
    </div>
  );
};

export default Attachments;
