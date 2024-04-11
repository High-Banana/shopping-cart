import PropTypes from "prop-types";

export default function Button({ title, className = "bg-[gray]", onClick, attributes }) {
  const defaultStyle = "px-[30px] py-[15px] rounded-[8px] font-bold text-white duration-[0.3s] hover:scale-105";
  return (
    <>
      <button onClick={onClick} className={`${defaultStyle} ${className}`} {...attributes}>
        {title}
      </button>
    </>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  attributes: PropTypes.object,
};
