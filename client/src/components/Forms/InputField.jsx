import PropTypes from "prop-types";
import { setID } from "../../utils/helper";

export default function InputField({ label, type, className, attributes, errorState, setValue }) {
  const id = setID(label);
  return (
    <div className="flex flex-col gap-2 text-[#c9c9c9]">
      <label
        className={`font-bold tracking-wider text-[12px] uppercase ${errorState ? "text-[#f14747]" : "text-white"}`}
        htmlFor={id}>
        {label}
        {errorState ? (
          <span className="text-[#f14747] font-semibold italic normal-case">
            <span className="pr-1 pl-1">-</span>
            {errorState}
          </span>
        ) : null}
      </label>
      <input
        onChange={(event) => setValue(type === "file" ? event.target.files : event.target.value)}
        id={id}
        type={type}
        // name={id}
        placeholder="Accer Nitro 5"
        {...attributes}
        className={`${
          className === undefined
            ? "h-[40px] rounded-md px-3 py-[6px] focus:outline-none transition ease-in-out duration-300 bg-[#202020]"
            : className
        }`}
      />
      {/* <PasswordToggle showPassword={showPassword} setShowPassword={setShowPassword} /> */}
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  errorState: PropTypes.string.isRequired,
  className: PropTypes.string,
  attributes: PropTypes.object,
};
