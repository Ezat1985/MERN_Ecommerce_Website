import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");
const MainLayout = () => {
  const [cart, setCart] = useState(cartFromLocalStorage);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <div>
      <Navbar cart={cart} />
      <Toaster />
      <Outlet context={{ cart, setCart }} />
    </div>
  );
};
export default MainLayout;
