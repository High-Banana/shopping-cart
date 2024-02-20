/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { IMAGE_SRC_PATH } from "../../services/constants";

export default function Card({ products }) {
  return (
    <div className="grid grid-cols-4 gap-[15px] items-center pb-[100px] pt-[20px]">
      {products.map((product) => {
        return (
          <div key={product.id} className="flex flex-col h-full transition duration-[0.3s] hover:translate-y-[-10px]">
            <Link to={`${product.product_type}/${product.id}`}>
              <img
                src={`${IMAGE_SRC_PATH}/${product.image}`}
                alt={product.product_name}
                className="h-[300px] w-full object-contain"
              />
              <div className="bg-[#dcdcdc] rounded-[8px] p-[10px] flex flex-col gap-[15px]">
                <h1 className="text-[20px] font-[700]">{product.product_name}</h1>
                <span className="text-[18px] font-[600]">NPR {parseFloat(product.product_price).toLocaleString("en-US")}</span>
                <span className="font-[500] text-[#5f5f5f]">{product.product_type}</span>
                {/* <h1>{product.product_description}</h1> */}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
