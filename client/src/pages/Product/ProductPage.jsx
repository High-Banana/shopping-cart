/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { fetchApi } from "../../services/api/Fetch";
import Loading from "../../components/Loading/Loading";

export default function ProductPage() {
  const [smartPhones, setSmartPhones] = useState([
    {
      id: null,
      title: null,
      imgSource: null,
      description: null,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApi().then((data) => {
      const newProduct = data.products.map((product) => {
        return { id: product.id, title: product.title, imgSource: product.images[0], description: product.description };
      });
      setSmartPhones(newProduct);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <h1>Products</h1>
      {isLoading ? <Loading /> : <Card smartPhoneDetails={smartPhones} />}
    </>
  );
}
