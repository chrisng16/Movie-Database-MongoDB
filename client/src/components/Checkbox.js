import React from "react";

export const Checkbox = ({label, isChecked, onChange}) => {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {label}
    </label>
  );
};
