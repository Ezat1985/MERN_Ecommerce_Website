import { useCallback, useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import { addToCart } from "../utils/cart";

const ProductDetails = () => {
  const { cart, setCart } = useOutletContext();
  //const isProductInCart = cart.find((item) => item.id === product.id);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    old_price: "",
    new_price: "",
    images: [],
    rating: "",
    category: "",
  });
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${id}`);
        if (!res.ok) throw Error("Fetching failed");

        const data = await res.json();

        setProduct(data);
        setActiveImage(data.images[0]);
      } catch (error) {
        console.error(error);
        /*         setStatus("error");
         */
      }
    };

    fetchProduct();
  }, [id]);
  const handleMouseEnterProduct = (images) => {
    setActiveImage(images);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg-w-96 bg-slate-200 relative">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>
          {/* product Zoom ende */}
          <div className="flex gap-2 lg:flex-col  h-full">
            {product.images.map((images, index) => {
              return (
                <div
                  className="h-20 w-20 bg-slate-200 rounded p-1"
                  key={images}
                >
                  <img
                    src={product.images[(0, 1)]}
                    alt=""
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                    onMouseEnter={() => handleMouseEnterProduct(images)}
                    onClick={() => handleMouseEnterProduct(images)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* product details */}
        <div>
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
            {product.brand}
          </p>
          <h2 className="text-2xl lg:text-4xl font-medium">{product.name}</h2>
          <p className="capitalize text-slate-400">{product.category}</p>
          <div className="text-red-600 flex items-center gap-1">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
          </div>
          <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            <p className="text-red-600">
              {displayINRCurrency(product.new_price)}
            </p>
            <p className="text-slate-400 line-through">
              {displayINRCurrency(product.old_price)}
            </p>
          </div>

          <div className="flex items-center gap-3 my-2">
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
          <div>
            <p className="text-slate-600 font-medium my-1">Description : </p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
