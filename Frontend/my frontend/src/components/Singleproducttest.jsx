import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Singleproducttest = () => {
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/products");

        if (!res.ok) throw Error("Fetching failed");

        const data = await res.json();

        setProducts(data);
        setLoading(false);
        console.log(products);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Our Products</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          products &&
          products.map((product) => (
            <Link
              to={"product/" + product?._id}
              key={product._id} // Ensure to use _id for the key
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img
                  src={product?.images[0]} // Use product image from backend
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                {/* <p>{product.description}</p> */}
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Singleproducttest;
