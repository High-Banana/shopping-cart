/* eslint-disable react/prop-types */
export default function Card({ products }) {
  const BASE_URL = "http://localhost:5000";
  return (
    <div className="grid grid-cols-2">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h1>{product.product_name}</h1>
            <h1>${product.product_price}</h1>
            <h1>{product.product_description}</h1>
            <img src={`${BASE_URL}/db_images/${product.image}`} alt={product.product_name} />
          </div>
        );
      })}
    </div>
  );
}
