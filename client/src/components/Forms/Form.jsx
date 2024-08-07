import React from "react";
import PropTypes from "prop-types";
import Button from "../ui/Button";
import { useUIContext } from "../../context/UIContext";
import { useProductFormProvider } from "../../context/ProductFormContext";
/* eslint-disable react-hooks/exhaustive-deps */

export default function Form({ values = { title: "", handleSubmit: null }, children }) {
  const { title, handleSubmit } = values;
  const { showForm, handleFormClose, setShowForm } = useUIContext();
  const { setReFetchData, setIsProductDeleted } = useProductFormProvider();

  React.useEffect(() => {
    setShowForm(true);
    setReFetchData(false);
    setIsProductDeleted(false);
  }, []);

  return (
    <div className="absolute min-h-screen top-0 left-0 right-0 bottom-0 z-30">
      <div
        onClick={(event) => handleFormClose(event)}
        className="absolute top-0 left-0 right-0 bottom-0 background-overlay z-[1]"></div>
      <div className="absolute flex flex-col justify-center items-center right-0 left-0 py-3 min-h-dvh">
        <div
          className={`bg-[#434343] w-[440px] mt-10 rounded-md z-[2] ${
            showForm ? "scale-100 duration-200" : "scale-75 duration-200 opacity-15"
          }`}>
          <h2 className="text-white text-2xl font-bold text-center p-6">{title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-[20px] p-5">{children}</div>
            <div className="flex gap-[10px] p-4 justify-end items-center bg-[#2f2f2f] rounded-[0_0_6px_6px]">
              <Button
                title="Cancel"
                onClick={handleFormClose}
                className="bg-transparent font-normal py-[7px] px-[28px] rounded-sm hover:scale-[none] hover:underline"
              />
              <Button
                title={title}
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
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }),
};
