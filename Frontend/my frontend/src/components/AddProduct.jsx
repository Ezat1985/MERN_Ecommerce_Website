import axios from "axios";
import { useState } from "react";
import { SpinnerCircular } from "spinners-react";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    brand: "",
    old_price: "",
    new_price: "",
    category: "",
    images: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const predefinedCategories = [
    "TV",
    "Smartphone",
    "Console",
    "Laptop",
    "Tablet",
    "Drohne",
    "Audio",
    "Camera",
    "Gaming",
    "Accessories",
    "NEW",
  ];

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProductDetails({ ...productDetails, images: e.target.files });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("old_price", productDetails.old_price);
    formData.append("new_price", productDetails.new_price);
    formData.append("brand", productDetails.brand);
    formData.append("category", productDetails.category);

    if (productDetails.images) {
      for (let i = 0; i < productDetails.images.length; i++) {
        formData.append("images", productDetails.images[i]);
      }
    }

    try {
      await axios.post("http://localhost:3001/products", formData, {
        withCredentials: true,
      });

      setProductDetails({
        name: "",
        description: "",
        old_price: "",
        new_price: "",
        brand: "",
        category: "",
        images: null,
      });

      alert("Product added");
    } catch (error) {
      console.error("Error uploading product:", error);
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-5 mx-auto ">
      <div className="bg-slate-200 rounded-lg p-5">
        <h1 className="text-2xl mb-5 text-center">Add New Product</h1>

        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}

        <form className="flex flex-col" onSubmit={addProduct}>
          <label className="ml-5 text-gray-500">Product Name</label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="name"
            placeholder="Type here"
            value={productDetails.name}
            onChange={handleChange}
          />

          <label className="ml-5 text-gray-500">Old Price</label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="old_price"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={handleChange}
          />

          <label className="ml-5 text-gray-500">New Price</label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={handleChange}
          />

          <label className="ml-5 text-gray-500">Brand</label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="brand"
            placeholder="Type here"
            value={productDetails.brand}
            onChange={handleChange}
          />

          <label className="ml-5 text-gray-500">Category</label>
          <select
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            value={productDetails.category}
            onChange={handleChange}
            name="category"
          >
            <option value="">Choose a category</option>
            {predefinedCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="ml-6 text-gray-500">Image</label>
          <input
            className="border-gray-300 rounded-lg my-2 mx-6"
            type="file"
            multiple
            onChange={handleFileChange}
          />

          <label className="ml-6 text-gray-500">Description</label>
          <textarea
            className="border-gray-300 rounded-lg my-2 mx-6"
            cols="30"
            rows="2"
            name="description"
            placeholder="Type here"
            value={productDetails.description}
            onChange={handleChange}
          ></textarea>

          {loading ? (
            <div className="flex justify-center mt-4">
              <SpinnerCircular
                size={50}
                thickness={100}
                speed={100}
                color="rgba(57, 111, 172, 1)"
                secondaryColor="rgba(0, 0, 0, 0.44)"
              />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-slate-700 rounded-lg text-white h-8 w-[100px] ml-6 mb-2 mt-2"
            >
              ADD
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
