import PropTypes from "prop-types";
import Button from "./ui/Button";

export default function Error({ onClickFunction, errorDetail }) {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-[50px]">
      <div className="flex text-7xl gap-[20px] items-center">
        <span className="text-6xl">{errorDetail.response.status} Error</span> |
        <span className="text-6xl">{errorDetail.response.statusText}</span>
      </div>
      <Button title="Try Again" className="bg-[#d72c2c]" onClick={onClickFunction} />
    </div>
  );
}

Error.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
  errorDetail: PropTypes.object.isRequired,
};
