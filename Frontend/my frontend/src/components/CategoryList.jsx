import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-center text-2xl mb-4'>Categories</h2>
      {loading ? (
        <div className='flex justify-center'>
          <SpinnerCircular
            size={50}
            thickness={100}
            speed={100}
            color='rgba(57, 111, 172, 1)'
            secondaryColor='rgba(0, 0, 0, 0.44)'
          />
        </div>
      ) : (
        <div className='flex items-center gap-4 justify-between'>
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                to={`/product-category/${category.name}`}
                className='cursor-pointer'
                key={`category-${category.name}`}
              >
                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center'>
                  <img
                    src={
                      category.products.length > 0
                        ? category.products[0].images[0]
                        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                    }
                    alt={category.name}
                    className='h-full w-full object-cover'
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
