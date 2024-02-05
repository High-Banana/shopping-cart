/* eslint-disable react/prop-types */
export default function Card({ products }) {
  return (
    <div className="grid grid-cols-2">
      {products.map((product) => {
        return (
          <div key={product.product_id}>
            <h1>{product.product_name}</h1>
            <h1>{product.product_price}</h1>
            <h1>{product.product_description}</h1>
          </div>
        );
      })}
    </div>
  );
}
