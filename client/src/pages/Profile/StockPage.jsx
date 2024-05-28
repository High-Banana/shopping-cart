import React from "react";
import useProductAPI from "../../hooks/useProductAPI";
import { productFetchType } from "../../services/constants";

export default function StockPage() {
  const { fetchItems, items } = useProductAPI();

  React.useEffect(() => {
    fetchItems({ fetchType: productFetchType.STOCK });
    console.log(items);
  }, []);

  return (
    <div className="mt-[20px]">
      <h1 className="text-3xl font-semibold capitalize">Products available in stock</h1>
      <div>
        {/* <table>
          <tr>
            <th>Name</th>
            <th>Stock Price</th>
            <th>Quantity</th>
          </tr>
        </table> */}
      </div>
    </div>
  );
}
