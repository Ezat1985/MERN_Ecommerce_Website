import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const column = [
    {
      name: "Product Image",
      selector: (row) => row.images,
    },
    {
      name: "Product Name",
      selector: (row) => row.name,
    },
    {
      name: "Old Price",
      selector: (row) => row.old_price,
    },
    {
      name: "New Price",
      selector: (row) => row.new_price,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Category",
      selector: (row) => row.category,
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products", {
          withCredentials: true,
        });

        setProducts(response.data);
        console.log(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <DataTable>
        columns = {column}
        data = {products}
      </DataTable>
    </div>
  );
};

export default ProductList;
