import { useState } from "react";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/products");
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  fetchInfo();

  return (
    <div className="List-product flex-col items-center w-full">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <div
              key={index}
              className="listproduct-format-main listproduct-format"
            >
              <img src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>${product.category}</p>
              <CiCircleRemove />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
