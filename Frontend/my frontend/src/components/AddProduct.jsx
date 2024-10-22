import { useState } from "react";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    brand: "",
    old_price: "",
    new_price: "",
    rating: "",
    category: "category1",
  });
  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    console.log(e);
  };

  const handleFileChange = (e) => {
    setProductDetails({ ...productDetails, image: e.target.files[0] });
  };
  const AddProduct = async (e) => {
    e.preventDefault();

    console.log(productDetails);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("image", productDetails.image);
    formData.append("old_price", productDetails.old_price);
    formData.append("new_price", productDetails.new_price);
    formData.append("brand", productDetails.brand);
    formData.append("category", productDetails.category);

    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        formData
      );
      console.log("Product uploaded successfully:", response.data);

      setProductDetails({
        name: "",
        description: "",
        old_price: "",
        new_price: "",
        brand: "",
        category: "",
        image: null,
      });
      alert("Product added");
    } catch (error) {
      console.error("Error uploading product:", error.message);
    }
  };
  return (
    <div className="flex items-center justify-center mt-5 mx-auto ">
      <div className="bg-slate-200  rounded-lg">
        <h1 className="text-2xl mb-5 ml-5 text-center">Add New Product</h1>
        <div className="flex flex-col">
          <label className="ml-5 text-gray-500" htmlFor="">
            product Name
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="ProductName"
            id="ProductName"
            placeholder="Type here"
            value={productDetails.name}
            onChange={handleChange}
          />
          <label className="ml-5 text-gray-500" htmlFor="">
            Old_Price
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="old_price"
            id="old_price"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={handleChange}
          />
          <label className="ml-5 text-gray-500" htmlFor="">
            New_price
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="new_price"
            id="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={handleChange}
          />

          <label className="ml-5 text-gray-500" htmlFor="">
            Brand
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="brand"
            id="brand"
            placeholder="Type here"
            value={productDetails.brand}
            onChange={handleChange}
          />

          <label className="ml-5 text-gray-500" htmlFor="">
            Catagory
          </label>
          <select
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            name=""
            id=""
            value={productDetails.category}
            onChange={handleChange}
          >
            <option value="category1">category1</option>
            <option value="category2">category2</option>
            <option value="category3">category3</option>
          </select>
          <label className="ml-6 text-gray-500" htmlFor="">
            Image
          </label>
          <input
            className="border-gray-300 rounded-lg my-2 mx-6"
            type="file"
            onChange={handleFileChange}
          />
          <label className="ml-6 text-gray-500" htmlFor="">
            description
          </label>
          <textarea
            className="border-gray-300 rounded-lg my-2 mx-6"
            cols="30"
            rows="2"
            name="description"
            id="description"
            placeholder="Type here"
            value={productDetails.description}
            onChange={handleChange}
          ></textarea>
          <hr />

          <button
            className="bg-slate-700 rounded-lg text-white h-8 w-[100px] ml-6 mb-2 mt-2  "
            onClick={AddProduct}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
