import React from "react";
import PropTypes from "prop-types";
import { BsThreeDotsVertical } from "react-icons/bs";
import GoBackButton from "../../../components/ui/GoBackButton";
import { useUserContext } from "../../../context/UserContext";
import { useProductFormProvider } from "../../../context/ProductFormContext";
import { useUIContext } from "../../../context/UIContext";
import { productFormFillup, productSubmitType } from "../../../services/constants";

export default function Navigation({ productID }) {
  const { user } = useUserContext();
  const { dispatch, setReFetchData } = useProductFormProvider();
  const { handleFormOpen, setIsDeleteForm } = useUIContext();
  const [showOptions, setShowOptions] = React.useState(false);
  const buttonRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);

  function handleClick({ action }) {
    action === productSubmitType.UPDATE_PRODUCT ? handleFormOpen() : setIsDeleteForm(true);
    dispatch({ type: action });
    dispatch({ type: productFormFillup.SET_PRODUCT_UUID, payload: productID });
    setReFetchData(false);
    console.log(action);
  }

  function handleClickOutside(event) {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) setShowOptions(false);
  }

  return (
    <div className="flex justify-between items-center sticky top-[80px]">
      <GoBackButton />
      {user.length !== 0 && user[0].isAdmin !== 0 && (
        <div className="relative">
          <div className="relative flex items-center">
            <button ref={buttonRef} className="mx-[15px] text-2xl" onClick={() => setShowOptions(!showOptions)}>
              <BsThreeDotsVertical />
            </button>
            <div
              className={`${
                showOptions ? "flex flex-col gap-2" : "hidden"
              } absolute top-[1px] right-[35px] bg-[#212121] rounded-md text-white`}>
              <button
                onClick={() => handleClick({ action: productSubmitType.UPDATE_PRODUCT })}
                className="font-semibold border-b py-2 px-4 hover:underline"
                aria-label="edit">
                Edit
              </button>
              <button
                onClick={() => handleClick({ action: productSubmitType.DELETE_PRODUCT })}
                className="font-semibold pb-2 px-4 hover:underline"
                aria-label="delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Navigation.propTypes = {
  productID: PropTypes.string.isRequired,
};
