import React, { useId } from "react";

const Select = ({ option, label, calssName = "", ...props }, ref) => {
  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id} className=""></label>}
      <select
        name=""
        id={id}
        ref={ref}
        className={`${calssName} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        {...props}
      >
        {option?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      Select
    </div>
  );
};

export default React.forwardRef(Select);
