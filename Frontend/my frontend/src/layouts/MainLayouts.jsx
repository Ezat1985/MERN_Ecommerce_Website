import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Footer from "../components/Footer";

const MainLayout = () => {
  const [cart, setCart] = useState([]);
  return (
    <div>
      <Navbar cart={cart} />
      <Toaster />
      <Outlet context={{ cart, setCart }} />
      <Footer />
    </div>
  );
};

export default MainLayout;
