import { useEffect, useState } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products", {
          withCredentials: true,
        });
        console.log(response);
        setProducts(response.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
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
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Old_Price</th>
            <th>New_Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr>
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
                          src={product.images[0]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-50">Marke</div>
                      <div className="font-bold">{product.brand}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {product.name}
                  <br />
                  {/* <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span> */}
                </td>
                <td>{product.old_price}</td>
                <th>
                  <div>{product.new_price}</div>
                </th>
                <th>
                  <div>{product.category}</div>
                </th>
                <th>
                  <div
                    className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer "
                    onClick={() => setEditProduct(true)}
                  >
                    <MdModeEditOutline />
                  </div>
                  {editProduct && <AdminEditProduct products={products} />}
                </th>
              </tr>
            ))}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
};

export default ProductList;
