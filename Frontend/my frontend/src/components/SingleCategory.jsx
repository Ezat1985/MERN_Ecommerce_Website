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
          `http://localhost:3001/categories/${categoryId}`
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
      <div className="container flex gap-4 mt-11 mx-auto p-4 flex-wrap justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          categoryProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="card card-side bg-slate-100 max-w-96 max-h-fit shadow-xl"
            >
              <figure>
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                  }
                  alt={product.name}
                  className="max-w-fit max-h-fit object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-base font-medium leading-tight">
                  {product.brand} {product.name}
                </h3>
                <p className="text-green-600 font-bold">${product.new_price}</p>
                {product.old_price && (
                  <p className="text-gray-500 line-through">
                    ${product.old_price}
                  </p>
                )}
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SingleCategory;
