import React from "react";
import PropTypes from "prop-types";
import { setID } from "../../utils/helper";
/* eslint-disable react-hooks/exhaustive-deps */

export default function SelectField({ label, type, className, options, attributes, setValue }) {
  const id = setID(label);

  function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  React.useEffect(() => {
    setValue(options[0]);
  }, []);

  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label htmlFor={id}>{label}</label>
      <select
        onChange={(event) => setValue(capitalise(event.target.value))}
        id={id}
        type={type}
        {...attributes}
        className={`${
          className === undefined
            ? "h-[40px] rounded-md px-3 py-[6px] focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
            : className
        }`}>
        {options.map((option, index) => (
          <option value={option.toLowerCase()} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  setValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  attributes: PropTypes.object,
};
