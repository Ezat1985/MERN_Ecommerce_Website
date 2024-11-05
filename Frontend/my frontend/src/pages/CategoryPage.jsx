import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

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

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [maxPrice, setMaxPrice] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    setProducts([]);
    setError("");
    setMaxPrice(null);
    setRatingFilter(null);
    setLoading(true);

    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories?name=${category}`
        );
        const categoryData = response.data.find((cat) => cat.name === category);

        if (categoryData && categoryData.products) {
          setProducts(categoryData.products);
        } else {
          setError("No products found in this category.");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
        setError("Failed to fetch category data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/category/${newCategory}`);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(parseInt(value, 10));
  };

  const handleRatingChange = (rating) => {
    setRatingFilter(rating);
  };

  const parsePrice = (price) => {
    return parseFloat(price.replace(",", ".")) || 0;
  };

  const filteredProducts = products.filter((product) => {
    const newPrice = parsePrice(product.new_price);
    return (
      (!maxPrice || newPrice <= maxPrice) &&
      (!ratingFilter || product.rating >= ratingFilter)
    );
  });

  return (
    <div className="flex container mx-auto p-4">
      <div className="w-1/4 p-4 bg-base-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
        <ul className="space-y-2">
          {predefinedCategories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  className="radio radio-primary mr-2"
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mt-6">Filter by Price</h3>
        <div className="flex flex-col items-start mt-2">
          <input
            type="range"
            min={0}
            max={5000}
            value={maxPrice || 5000}
            onChange={(e) => handleMaxPriceChange(e.target.value)}
            className="slider w-full"
          />
          <span>{`From $0 to ${maxPrice ? `$${maxPrice}` : ""}`}</span>
        </div>

        <h3 className="text-lg font-semibold mt-6">Filter by Rating</h3>
        <div className="flex flex-col space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className="flex items-center">
              <input
                type="radio"
                name="rating"
                onChange={() => handleRatingChange(star)}
                className="radio radio-primary mr-2"
              />
              <span>{"⭐".repeat(star)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-3/4 p-4">
        <h2 className="text-2xl mb-4 text-center capitalize">{category}</h2>
        {loading ? (
          <div className="flex justify-center">
            <SpinnerCircular
              size={50}
              thickness={100}
              speed={100}
              color="rgba(57, 111, 172, 1)"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="card w-full bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <figure>
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                    }
                    alt={product.name || "No image available"}
                    className="w-full h-80 object-contain rounded-md"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="text-lg font-semibold truncate">
                    {product.brand} {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-through">
                    Old price: ${product.old_price}
                  </p>
                  <div className="flex justify-start w-40">
                    <p className="font-bold">${product.new_price}</p>
                    {product.old_price && product.new_price && (
                      <p className="text-green-500 text-sm font-bold">
                        Save{" "}
                        {Math.round(
                          ((parseFloat(product.old_price.replace(",", ".")) -
                            parseFloat(product.new_price.replace(",", "."))) /
                            parseFloat(product.old_price.replace(",", "."))) *
                            100
                        )}
                        %
                      </p>
                    )}
                  </div>
                  <p className="text-xs font-bold text-green-500">
                    {product.available ? "In Stock" : "Out of Stock"}
                  </p>
                  <div className="flex items-center mt-2">
                    {"⭐".repeat(product.rating)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
