import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa6";
import SingleCategory from "../components/SingleCategory";
import { addToCart } from "../utils/cart";

const ProductDetails = () => {
  const { cart, setCart } = useOutletContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomScale, setZoomScale] = useState(1.0);
  const [zoomCoordinates, setZoomCoordinates] = useState({
    x: "50%",
    y: "50%",
  });
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        if (!res.ok) throw new Error("Fetching failed");
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.images[0] || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleMouseEnterThumbnail = (image) => setActiveImage(image);
  const handleMouseEnterImage = () => setZoomScale(2);
  const handleMouseLeaveImage = () => setZoomScale(1.0);
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoordinates({ x: `${x}%`, y: `${y}%` });
  };
  const handleQuantityChange = (amount) =>
    setQuantity((prev) => Math.max(1, prev + amount));
  const handleTabChange = (tab) => setTab(tab);

  const calculateDiscount = (oldPrice, newPrice) => {
    const oldPriceNum = parseFloat(oldPrice);
    const newPriceNum = parseFloat(newPrice);
    return oldPriceNum && newPriceNum
      ? Math.round(((oldPriceNum - newPriceNum) / oldPriceNum) * 100)
      : null;
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex flex-col lg:flex-row-reverse gap-4">
          <div
            className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 overflow-hidden relative"
            style={{ cursor: "zoom-in" }}
            onMouseEnter={handleMouseEnterImage}
            onMouseLeave={handleMouseLeaveImage}
            onMouseMove={handleMouseMove}
          >
            <img
              src={activeImage}
              className="h-full w-full object-center object-contain transition-transform duration-300"
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: `${zoomCoordinates.x} ${zoomCoordinates.y}`,
              }}
              alt="Product"
            />
          </div>

          <div className="flex gap-2 lg:flex-col h-full">
            {product.images.map((image, index) => (
              <Thumbnail
                key={index}
                image={image}
                onMouseEnter={() => handleMouseEnterThumbnail(image)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <p className="text-slate-400 mb-2">Brand: {product.brand}</p>
          <div className="flex items-center gap-1 text-yellow-500 mb-3">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <span className="text-slate-500 text-sm">(0 Reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-3">
            <span className="text-green-600">${product.new_price}</span>
            {product.old_price && (
              <span className="text-red-600 line-through">
                ${product.old_price}
              </span>
            )}
          </div>
          {product.old_price && product.new_price && (
            <p className="text-green-500 text-lg font-bold">
              Save {calculateDiscount(product.old_price, product.new_price)}%
            </p>
          )}
          <p className="font-semibold mb-4">
            {product.available ? "IN STOCK" : "OUT OF STOCK"}
          </p>
          <p className="text-slate-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => {
                const newArray = addToCart(cart, product);
                setCart(newArray);
              }}
              className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-4 border-b pb-2 mb-4">
          <TabButton
            label="Description"
            active={tab === "description"}
            onClick={() => handleTabChange("description")}
          />
          <TabButton
            label="Additional Info"
            active={tab === "additional"}
            onClick={() => handleTabChange("additional")}
          />
          <TabButton
            label="Reviews"
            active={tab === "reviews"}
            onClick={() => handleTabChange("reviews")}
          />
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          {tab === "description" && <p>{product.description}</p>}
          {tab === "additional" && <p>No additional information available.</p>}
          {tab === "reviews" && <p>No reviews available.</p>}
        </div>
      </div>

      <div className="mt-8">
        <SingleCategory categoryId={product.category._id} />
      </div>
    </div>
  );
};

const Thumbnail = ({ image, onMouseEnter }) => (
  <div className="h-20 w-20 bg-slate-200 rounded p-1">
    <img
      src={image}
      alt="Thumbnail"
      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
      onMouseEnter={onMouseEnter}
    />
  </div>
);

const TabButton = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 rounded-t-lg ${
      active ? "bg-purple-500 text-white" : "text-slate-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default ProductDetails;
