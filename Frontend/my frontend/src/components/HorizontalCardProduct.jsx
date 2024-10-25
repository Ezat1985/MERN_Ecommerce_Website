import { useEffect, useState } from "react";
import axios from "axios";

import samsungimage from "../assests/products/smartphones/samsungs24ultra.jpg";

const HorizontalCardProduct = ({ heading }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(1).fill(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
      // console.log(categories);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6">
      <h1 className="text-2xl font-semibold py-4">{heading}</h1>
      {/* <div className="flex items-center gap-4 md:gap-6"> */}
      <div className=" w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
        <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
          <img src={samsungimage} className=" h-full hover:scale-110 " />
        </div>
        <div>
          <h2 className="font-medium text-base md:text-lg text-black">
            productname
          </h2>
          <p>product category</p>
          <div className="flex gap-3">
            <p className="text-red-600 font-medium">newprice</p>
            <p className="text-slate-500 line-through"> oldprice</p>
          </div>
          <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full">
            Add to Cart
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default HorizontalCardProduct;
