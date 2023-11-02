import React from "react";
import DropDown from "../../common/DropDown";

const Languages = () => {
  return (
    <div className="space-y-3 pt-2">
      <div>
        <h2 className="text-sm">Language</h2>
        <p className="text-xs text-gray-600">
          Select the language of the calendar
        </p>
      </div>

      <div>
        <DropDown
          options={[
            { id: 1, title: "English", default: true },
            { id: 2, title: "Portuguese", default: false },
            { id: 3, title: "German", default: false },
            { id: 4, title: "Turkish", default: false },
            { id: 5, title: "Italian", default: false },
          ]}
        />
      </div>
    </div>
  );
};

export default Languages;
