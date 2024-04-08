import PropTypes from "prop-types";

export default function InputField({ label, type, className, attributes }) {
  console.log(...attributes);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label>{label}</label>
      <input
        type={type}
        name="productName"
        placeholder="Accer Nitro 5"
        {...attributes}
        className={`${
          className === undefined
            ? "h-[40px] rounded-md p-3 focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
            : className
        }`}
      />
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  attributes: PropTypes.array,
};
