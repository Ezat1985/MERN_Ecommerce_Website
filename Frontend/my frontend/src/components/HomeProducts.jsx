import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/categories?limit=5`
        );
        if (!res.ok) throw new Error("Fetching categories failed");

        const data = await res.json();
        setCategoryProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories with products:", error);
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        categoryProducts.map((category) => (
          <div key={category._id} className="mb-10">
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <div className="flex gap-5 overflow-x-auto">
              {category.products && category.products.length > 0 ? (
                category.products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="card bg-base-100 w-72 shadow-xl border border-blue-50 m-4 transition-transform transform hover:scale-105"
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
                      <h3 className="card-title text-base font-medium leading-tight text-ellipsis">
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
                      <div className="mx-auto flex gap-11">
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
              ) : (
                <p className="text-gray-500">
                  No products available in this category.
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeProducts;
