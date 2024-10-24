import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/products/category/${category}`
        );

        setProducts(response.data); // Adjusted based on new API response format
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl mb-4 text-center capitalize'>{category}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className='flex flex-wrap gap-4 justify-center'>
          {products.map((product) => (
            <div key={product._id} className='w-64 p-4 border rounded-lg'>
              <img
                src={product.images[0]}
                alt={product.name}
                className='w-full h-48 object-cover'
              />
              <h3 className='text-lg font-semibold mt-2'>{product.name}</h3>
              <p>{product.description}</p>
              <p className='text-red-600 mt-2'>${product.new_price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
