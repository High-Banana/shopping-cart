import PropTypes from "prop-types";
import Button from "../ui/Button";

export default function Form({ values = { isFormOpen: false, title: "", handleFormClose: null }, children }) {
  const { isFormOpen, handleFormClose, title } = values;
  return (
    <div className="absolute min-h-screen top-0 left-0 right-0 bottom-0">
      <div
        onClick={(event) => handleFormClose(event)}
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-35 backdrop-blur-sm z-[1]"></div>
      <div className="absolute flex flex-col justify-center items-center right-0 left-0 py-3">
        <div
          className={`bg-[#434343] w-[440px] rounded-md z-[2] ${
            isFormOpen ? "scale-100 duration-200" : "scale-75 duration-200 opacity-15"
          }`}>
          <h2 className="text-white text-2xl font-bold text-center p-6">{title}</h2>
          <form>
            <div className="flex flex-col gap-[20px] p-5">{children}</div>
            <div className="flex gap-[10px] p-4 justify-end items-center bg-[#2f2f2f] rounded-[0_0_6px_6px]">
              <Button
                title="Cancel"
                onClick={handleFormClose}
                className="bg-transparent font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:underline"
              />
              <Button
                title={title}
                onClick={handleFormClose}
                className="bg-[#5865f2] font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:bg-opacity-70"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  values: PropTypes.shape({
    isFormOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    handleFormClose: PropTypes.func.isRequired,
  }),
};
