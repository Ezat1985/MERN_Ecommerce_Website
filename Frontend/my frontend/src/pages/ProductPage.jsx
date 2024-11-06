import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <SpinnerCircular
          size={50}
          thickness={100}
          speed={100}
          color="rgba(57, 111, 172, 1)"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-col items-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <div className="flex gap-2">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-2">Brand: {product.brand}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">
              {"⭐".repeat(product.rating)}
            </span>
            <span className="text-gray-500 ml-2">
              ({product.rating} reviews)
            </span>
          </div>
          <div className="mb-2">
            <span className="text-gray-500 line-through">
              Rs {product.old_price}
            </span>
            <span className="text-red-500 text-2xl font-bold ml-2">
              Rs {product.new_price}
            </span>
          </div>
          <p className="text-green-600 mb-4">
            {product.available ? "In Stock" : "Out of Stock"}
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-lg">
              <button className="p-2">-</button>
              <span className="px-4">1</span>
              <button className="p-2">+</button>
            </div>
            <button className="btn btn-primary flex items-center gap-2">
              <span>Add To Cart</span>
            </button>
          </div>

          <div className="mt-8">
            <div className="tabs mb-4">
              <button className="tab tab-bordered tab-active">
                Description
              </button>
              <button className="tab tab-bordered">Additional Info</button>
              <button className="tab tab-bordered">
                Reviews ({product.reviews || 0})
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
