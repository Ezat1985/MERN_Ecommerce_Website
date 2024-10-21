const AddProduct = () => {
  return (
    <div className="flex items-center justify-center mt-5 mx-auto ">
      <div className="bg-slate-200 w-[35%] rounded-lg">
        <h1 className="text-2xl mb-5 ml-5">Add New Product</h1>
        <div className="flex flex-col">
          <label className="ml-5 text-gray-500" htmlFor="">
            product title
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="title"
            id="title"
          />
          <label className="ml-5 text-gray-500" htmlFor="">
            price
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="title"
            id="title"
          />
          <label className="ml-5 text-gray-500" htmlFor="">
            Offer Price
          </label>
          <input
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            type="text"
            name="title"
            id="title"
          />
          <label className="ml-5 text-gray-500" htmlFor="">
            Catagory
          </label>
          <select
            className="border border-gray-300 h-10 rounded-lg my-2 mx-4"
            name=""
            id=""
          >
            <option value="category1">category1</option>
            <option value="category2">category2</option>
            <option value="category3">category3</option>
          </select>
          <label className="ml-6 text-gray-500" htmlFor="">
            Image
          </label>
          <input className="border-gray-300 rounded-lg my-2 mx-6" type="file" />
          <label className="ml-6 text-gray-500" htmlFor="">
            description
          </label>
          <textarea
            className="border-gray-300 rounded-lg my-2 mx-6"
            cols="30"
            rows="2"
            name="post"
            id="post"
          ></textarea>
          <hr />

          <button className="bg-slate-700 rounded-lg text-white h-8 w-[100px] ml-6 mb-2 mt-2  ">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
