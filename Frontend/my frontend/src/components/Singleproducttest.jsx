import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Singleproducttest = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3001/products");

        if (!res.ok) throw Error("Fetching failed");

        const data = await res.json();

        setProducts(data);
        console.log(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1>Home</h1>
      <div className="flex flex-wrap gap-5 justify-center">
        {products &&
          products.map((product) => (
            <Link
              to={"product/" + product?._id}
              key={product.id}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Singleproducttest;
