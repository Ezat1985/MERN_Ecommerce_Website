import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl mb-4 text-center'>Featured Categories</h2>

      {loading && (
        <div className='flex justify-center'>
          <SpinnerCircular
            size={50}
            thickness={100}
            speed={100}
            color='rgba(57, 111, 172, 1)'
            secondaryColor='rgba(0, 0, 0, 0.44)'
          />
        </div>
      )}

      {error && <p className='text-red-500 text-center'>{error}</p>}

      {!loading && !error && (
        <div className='flex justify-between gap-4 overflow-x-auto scrollbar-hide px-4'>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                to={`/product-category/${category.name}`}
                className='flex flex-col items-center min-w-[100px]'
                key={`category-${category.name}`}
              >
                <div className='w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-200 border-4 flex items-center justify-center'>
                  <img
                    src={
                      category.products.length > 0
                        ? category.products[0].images[0]
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                    }
                    alt={category.name}
                    className='h-full w-full object-cover transition-transform duration-300 hover:scale-150'
                  />
                </div>
                <p className='text-center text-sm md:text-base capitalize mt-2'>
                  {category.name}
                </p>
              </Link>
            ))
          ) : (
            <p className='text-center w-full'>No categories found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
