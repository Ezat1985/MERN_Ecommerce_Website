import { useState } from "react";

const FakeCheckout = ({ setCart }) => {
  const [formData, setFormData] = useState({
    name: "",
    adress: "",
    email: "",
    paymentMethod: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };
  const handleOrder = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="container mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500 mt-8 bg-slate-200">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
        {!orderPlaced ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border rounded w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block">Adress:</label>
              <input
                type="text"
                name="adress"
                value={formData.adress}
                onChange={handleChange}
                required
                className="border rounded w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block">Select Payment Method:</label>
              <select name="paymentMethod" onChange={handleChange} required>
                <option value="credit">Bank transfer</option>
                <option value="paypal">Master/VisaCard</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <button
              onClick={handleOrder}
              type="submit"
              className="bg-blue-500 text-white text-sm rounded p-2 mt-2 mx-40"
            >
              Place Order
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="p-5">Order Confirmed!</h3>
            <p>Thank you for your order, {formData.name}!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeCheckout;
