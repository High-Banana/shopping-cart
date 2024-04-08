import PropTypes from "prop-types";

export default function SelectField({ label, type, className, options, attributes }) {
  console.log(options);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label>{label}</label>
      <select
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
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  attributes: PropTypes.object,
};
