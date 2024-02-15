import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const { productID } = useParams();
  return (
    <>
      <h1>Single Product - {productID}</h1>
    </>
  );
}
