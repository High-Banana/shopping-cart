import PropTypes from "prop-types";
import { LuEye, LuEyeOff } from "react-icons/lu";

export default function PasswordToggle({ showPassword, setShowPassword, className }) {
  return (
    <button
      onClick={(event) => {
        setShowPassword(!showPassword);
        event.preventDefault();
      }}
      className={`absolute right-4 top-[133px] text-[20px] text-white cursor-pointer ${className}`}>
      {showPassword ? <LuEye /> : <LuEyeOff />}
    </button>
  );
}

PasswordToggle.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  className: PropTypes.string,
};
