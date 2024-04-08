import PropTypes from "prop-types";
import { setID } from "../../utils/helper";

export default function InputField({ label, type, className, attributes }) {
  const id = setID(label);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name="productName"
        placeholder="Accer Nitro 5"
        {...attributes}
        className={`${
          className === undefined
            ? "h-[40px] rounded-md px-3 py-[6px] focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
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
  attributes: PropTypes.object,
};
