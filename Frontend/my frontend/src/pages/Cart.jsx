import { useOutletContext } from "react-router-dom";
import { addToCart, removeFromCart } from "../utils/cart.js";
import Footer from "../components/Footer.jsx";

const Cart = () => {
  const { cart, setCart } = useOutletContext();
  const Cost = cart.reduce(
    (acc, item) => acc + item.quantity * item.new_price,
    0
  );
  const totalCost = Cost + 7;
  const allProducts = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (!cart.length) {
    return <div className="text-center text-2xl pt-40">No items in Cart!</div>;
  }
  console.log(cart);
  return (
    <div>
      <div>
        <h2 className="font-bold p-4 text-center text-xl text-slate-700 bg-slate-100 mb-5">
          Your cart <br />
          <span className="text-sm">
            There are {allProducts} products in your cart{" "}
          </span>
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-40">
          <div className="overflow-x-auto bg-slate-100 rounded-lg">
            <table className="table">
              <thead className="bg-slate-200 text-xl">
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
                        className="btn btn-circle btn-sm size-4 mx-7"
                        onClick={() => {
                          const newArray = removeFromCart(cart, item);
                          setCart(newArray);
                        }}
                      >
                        <img
                          src="./src/images/bin.png"
                          alt="bin"
                          className="items-center"
                        />
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
                  <td> {Cost} €</td>
                  {/*  <td>{item.quantity * item.new_price} €</td> */}
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td> 7 €</td>
                  {/*  <td>{item.quantity * item.new_price} €</td> */}
                </tr>
                <tr>
                  <td>Total</td>
                  <td> {totalCost} €</td>
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
      <Footer />
    </div>
  );
};

export default Cart;
