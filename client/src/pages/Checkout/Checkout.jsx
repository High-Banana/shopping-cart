import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { cartItems, calculateTotalPrice } = useCart();
  console.log(cartItems);
  return (
    <>
      {cartItems.length > 0 ? (
        <div>
          <div className="flex flex-col gap-10">
            <h1 className="font-bold text-4xl text-center mt-5">Thank you for buying from our website</h1>
            <h1 className="font-bold text-2xl text-center">Your Items</h1>
          </div>
          <table className="min-w-full divide-y divide-gray-200 mt-10 overflow-hidden px-5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black w-1">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black w-1">
                  Product Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-black w-1">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-[black] text-white divide-y divide-gray-200">
              {cartItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white w-1">{item.product_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white w-1">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap border-r border-white w-1">
                      {parseFloat(item.quantity * item.product_price).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h1 className="font-bold text-2xl mt-4"> Total Price: {calculateTotalPrice()}</h1>
        </div>
      ) : (
        <div>No products has been bought</div>
      )}
    </>
  );
}
