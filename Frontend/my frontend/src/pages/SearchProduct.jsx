import { useLocation } from "react-router-dom";

const SearchProduct = () => {
  const query = useLocation();
  console.log("query", query.search);
  return (
    <div>
      <h1>search product</h1>
    </div>
  );
};

export default SearchProduct;
