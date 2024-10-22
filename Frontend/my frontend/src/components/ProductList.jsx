import { useState } from "react";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";

// const ProductList = () => {
//   const [allProducts, setAllProducts] = useState([]);

//   const fetchInfo = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/products");
//       setAllProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };
//   fetchInfo();

//   return (
//     <div className="List-product flex-col items-center w-full">
//       <h1>All Products List</h1>
//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old Price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Remove</p>
//       </div>
//       <div className="listproduct-allproducts">
//         <hr />
//         {allProducts.map((product, index) => {
//           return (
//             <div
//               key={index}
//               className="listproduct-format-main listproduct-format"
//             >
//               <img src={product.image} alt="" />
//               <p>{product.name}</p>
//               <p>${product.old_price}</p>
//               <p>${product.new_price}</p>
//               <p>${product.category}</p>
//               <CiCircleRemove />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

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
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Products</th>
            <th>Title</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Category</th>
            <th>Remove</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {/* row 1 */}

          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>

          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">Hart Hagerty</div>
              </div>
            </div>
          </td>
          <td>
            <span className="badge badge-ghost badge-sm">
              Desktop Support Technician
            </span>
          </td>
          <td>Purple</td>
          <th>
            <button className="btn btn-ghost btn-xs">details</button>
          </th>
          <td>Purple</td>
          <td>Purple</td>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
