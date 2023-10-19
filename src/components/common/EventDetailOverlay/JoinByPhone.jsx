import React from "react";

const JoinByPhone = ({ joinByPhone }) => {
  return (
    <div>
      <h2 className="font-medium text-xs text-purple-600">Join by phone</h2>
      <p className="text-sm text-gray-700">
        {joinByPhone?.label} PIN: {joinByPhone.pin}
      </p>
    </div>
  );
};

export default JoinByPhone;
