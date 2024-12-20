import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SingleCategory = ({ categoryId }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
        );
        if (!res.ok) throw new Error("Fetching categories failed");

        const data = await res.json();
        console.log(data);
        setCategoryProducts(data.products);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories with products:", error);
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, [categoryId]);
  console.log(categoryProducts);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 mt-10">RELATED PRODUCTS</h1>
      <div className="container flex gap-4 mt-11 mx-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          categoryProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="card bg-base-100 w-72 shadow-xl border border-blue-50 m-4"
            >
              <figure>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                  }
                  alt={product.name}
                  className=" h-48 w-full object-center object-contain mt-2"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-base font-medium leading-tight">
                  {product.name.length > 33
                    ? `${product.name.slice(0, 33)}`
                    : product.name}
                  ...
                </h3>
                <div className=" mx-auto flex gap-11 mb-4 mt-4">
                  <p className="text-green-600 font-bold">
                    ${product.new_price}
                  </p>
                  {product.old_price && (
                    <p className="text-gray-500 line-through">
                      ${product.old_price}
                    </p>
                  )}
                </div>
                <div className="flex gap-8">
                  {product.old_price && product.new_price && (
                    <p className="text-red-500 text-sm">
                      Save{" "}
                      {Math.round(
                        ((parseFloat(product.old_price) -
                          parseFloat(product.new_price)) /
                          parseFloat(product.old_price)) *
                          100
                      )}
                      %
                    </p>
                  )}
                  <p className="text-sm text-green-500">
                    {product.available ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SingleCategory;
