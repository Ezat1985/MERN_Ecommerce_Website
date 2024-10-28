import { useOutletContext } from "react-router-dom";
import { addToCart, removeFromCart } from "../utils/cart.js";

const Cart = () => {
  const { cart, setCart } = useOutletContext();

  if (!cart.length) {
    return <div className="text-center text-2xl pt-40">No items in Cart!</div>;
  }
  console.log(cart);
  return (
    <div>
      <h2 className="font-bold p-4 text-center text-xl text-slate-700 bg-slate-200 mb-5">
        Your cart
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-40">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
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
                <tr key={item.id}>
                  <td>
                    <img src={item.images[0]} alt="" className="w-24 h-24" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.new_price}</td>
                  <td>
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => {
                        const newArray = removeFromCart(cart, item);
                        setCart(newArray);
                      }}
                    >
                      -
                    </button>
                    <span className="p-2">{item.quantity}</span>
                    <button
                      className="btn btn-circle btn-sm"
                      onClick={() => {
                        const newArray = addToCart(cart, item);
                        setCart(newArray);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{item.quantity * item.new_price} €</td>
                  <td>
                    <button
                      className="btn btn-circle btn-sm text-red-500"
                      onClick={() => {
                        const newArray = removeFromCart(cart, item);
                        setCart(newArray);
                      }}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <table className="table border-4 rounded-table text-orange-950">
            <thead>
              <tr>
                <th className="place-items-center text-center text-red-950 text-lg">
                  Cart Totals
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost All Products</td>
                <td> 1000 €</td>
                {/*  <td>{item.quantity * item.new_price} €</td> */}
              </tr>
              <tr>
                <td>Shipping</td>
                <td> 7 €</td>
                {/*  <td>{item.quantity * item.new_price} €</td> */}
              </tr>
              <tr>
                <td>Total</td>
                <td> 1007 €</td>
                {/*  <td>{item.quantity * item.new_price} €</td> */}
              </tr>
              <button className="btn btn-warning p-3 ml-20 my-5 ">
                Checkout
              </button>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
