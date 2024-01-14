/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { fetchApi } from "../../services/api/Fetch";

export default function ProductPage() {
  const [smartPhones, setSmartPhones] = useState([
    {
      id: null,
      title: null,
      imgSource: null,
      description: null,
    },
  ]);

  useEffect(() => {
    fetchApi().then((data) => {
      const newProduct = data.products.map((product) => {
        console.log(product);
        return { id: product.id, title: product.title, imgSource: product.images[0], description: product.description };
      });
      setSmartPhones(newProduct);
      // console.log(newProduct);
      console.log(smartPhones);
    });
  }, []);
  return (
    <>
      <h1>Products</h1>
      <Card smartPhoneDetails={smartPhones} />
    </>
  );
}
