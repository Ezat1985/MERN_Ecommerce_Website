// import { useLocation } from "react-router-dom";

// const SearchProduct = () => {
//   const query = useLocation();
//   console.log("query", query.search);
//   return (
//     <div>
//       <h1>search product</h1>
//     </div>
//   );
// };

// export default SearchProduct;
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?query=${searchTerm}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (query) {
      const delayDebounce = setTimeout(() => {
        handleSearch(query);
      }, 300);
      return () => clearTimeout(delayDebounce);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <h1>Search Results for: "{query}"</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchProduct;
