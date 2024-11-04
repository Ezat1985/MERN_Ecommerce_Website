import { useOutletContext } from "react-router-dom";
import { addToCart, removeFromCart } from "../utils/cart.js";
import Footer from "../components/Footer.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const Cart = () => {
  const { cart, setCart } = useOutletContext();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const Cost = cart.reduce(
    (acc, item) => acc + item.quantity * item.new_price,
    0
  );
  const totalCost = Cost + 6.99;
  const allProducts = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleOrderConfirmation = () => {
    setOrderConfirmed(true);
    setCart([]);
  };

  if (!cart.length && !orderConfirmed) {
    return <div className="text-center text-2xl pt-40">No items in Cart!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h2 className="font-bold text-center text-2xl text-gray-100 mb-6">
          Your Cart
          <br />
          <span className="text-sm text-gray-400">
            {allProducts} product{allProducts !== 1 ? "s" : ""} in your cart
          </span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="overflow-x-auto bg-gray-800 p-4 rounded-lg shadow-md w-full md:w-2/3">
            <table className="table-auto w-full text-gray-200">
              <thead className="bg-gray-700 text-lg">
                <tr>
                  <th>Product</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-gray-600">
                    <td className="p-2">
                      <img
                        src={item.images[0]}
                        alt=""
                        className="w-fit h-16 rounded"
                      />
                    </td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.new_price} €</td>
                    <td className="p-2 flex items-center space-x-2 my-3">
                      <button
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-full"
                        onClick={() => {
                          const newArray = removeFromCart(cart, item);
                          setCart(newArray);
                        }}
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded-full"
                        onClick={() => {
                          const newArray = addToCart(cart, item);
                          setCart(newArray);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td className="p-2">{item.quantity * item.new_price} €</td>
                    <td className="p-2">
                      <button
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded-full"
                        onClick={() => {
                          const newArray = removeFromCart(cart, item);
                          setCart(newArray);
                        }}
                      >
                        <img
                          src="./src/images/bin.png"
                          alt="Remove"
                          className="w-5 h-5"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/3">
            {orderConfirmed ? (
              <div className="text-center text-green-500">
                <h3 className="text-2xl font-bold mb-4">Order Confirmed!</h3>
                <p>Thank you for your payment!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-100 text-center">
                  Cart Totals
                </h3>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span>Cost All Products</span>
                  <span>{Cost.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 py-2">
                  <span>Shipping</span>
                  <span>6,99 €</span>
                </div>
                <div className="flex justify-between text-lg font-semibold py-2">
                  <span>Total</span>
                  <span>{totalCost.toFixed(2)} €</span>
                </div>

                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "ARTJD83_v4H0fbxwOLR98FCxeOOf5bzdVOXMiokYapQv6InMHnZuAibSFLnMOgw3YSemIemjqG531G3K",
                  }}
                >
                  <div className="">
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: totalCost.toString(),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(() => {
                          handleOrderConfirmation();
                        });
                      }}
                      onError={(err) => {
                        console.error("PayPal Checkout error:", err);
                        alert(
                          "An error occurred with the payment. Please try again."
                        );
                      }}
                    />
                  </div>
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
