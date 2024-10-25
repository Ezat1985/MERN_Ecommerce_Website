import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(1).fill(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
      console.log(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between scrollbar-none">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                key={`categoryLoading-${index}`}
              ></div>
            ))
          : categories.map((category) => (
              <Link
                to={`/product-category/${category.name}`}
                className="cursor-pointer"
                key={`category-${category.name}`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                  <img
                    src={
                      category.products.length > 0
                        ? category.products[0].images[0]
                        : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                    }
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {category.name}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
