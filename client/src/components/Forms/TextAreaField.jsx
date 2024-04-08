import PropTypes from "prop-types";
import { setID } from "../../utils/helper";

export default function TextAreaField({ label, type = "text", className, attributes }) {
  const id = setID(label);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        type={type}
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

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  attributes: PropTypes.object,
};
