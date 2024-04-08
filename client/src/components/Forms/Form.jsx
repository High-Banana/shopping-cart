import PropTypes from "prop-types";
import useCloseForm from "../../hooks/uesCloseForm";

export default function Form({ title, children }) {
  const { isFormOpen, handleFormClose } = useCloseForm();
  return (
    <div className="absolute min-h-screen top-0 left-0 right-0 bottom-0">
      <div
        onClick={(event) => handleFormClose(event)}
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-35 backdrop-blur-sm z-[1]"></div>
      <div className="absolute flex flex-col justify-center items-center right-0 left-0 py-3">
        <div
          className={`bg-[#434343] w-[440px] rounded-md z-[2] ${
            isFormOpen ? "scale-75 duration-200 opacity-15" : "scale-100 duration-200"
          }`}>
          <h2 className="text-white text-2xl font-bold text-center p-6">{title}</h2>
          <form>
            <div className="flex flex-col gap-[20px] p-5">{children}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
