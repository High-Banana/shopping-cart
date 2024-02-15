/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { fetchProductByID } from "../../services/api/Fetch";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { IMAGE_SRC_PATH } from "../../services/constants";

export default function SingleProduct() {
  const { productID } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchProductByID(productID)
      .then(([product]) => {
        setSingleProduct(product);
        setIsLoading(false);
        console.log(product);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <h1>Single Product - {productID}</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <img src={`${IMAGE_SRC_PATH}/${singleProduct.image}`} />
        </>
      )}
    </>
  );
}
