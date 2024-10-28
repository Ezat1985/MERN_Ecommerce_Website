import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const predefinedCategories = [
  'TV',
  'Smartphone',
  'Console',
  'Laptop',
  'Tablet',
  'Fashion',
  'Audio',
  'Camera',
  'Gaming',
  'Accessories',
  'NEW',
];

const HomeProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);

      try {
        const categoryData = {};

        for (const category of predefinedCategories) {
          const res = await fetch(
            `http://localhost:3001/products?category=${category}&limit=5`
          );

          if (!res.ok) throw Error(`Fetching failed for ${category}`);

          const data = await res.json();
          console.log(`Fetched products for category "${category}":`, data);
          categoryData[category] = data;
        }

        setCategoryProducts(categoryData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Our Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        predefinedCategories.map((category) => (
          <div key={category} className='mb-10'>
            <h2 className='text-xl font-semibold mb-2'>{category}</h2>
            <div className='text-gray-500 mb-4'>
              Do not miss the current offers until the end of March.
            </div>
            <div className='flex gap-5 overflow-x-auto'>
              {categoryProducts[category] &&
              categoryProducts[category].length > 0 ? (
                categoryProducts[category].map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className='card card-compact bg-base-100 w-64 shadow-xl'
                  >
                    <figure>
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                        }
                        alt={product.name}
                        className='h-48 w-full object-cover'
                      />
                    </figure>
                    <div className='card-body'>
                      <h3 className='card-title truncate'>{product.name}</h3>
                      <p className='text-green-600 font-bold'>
                        Rs {product.new_price}
                      </p>
                      {product.old_price && (
                        <p className='text-gray-500 line-through'>
                          Rs {product.old_price}
                        </p>
                      )}
                      {product.old_price && product.new_price && (
                        <p className='text-red-500 text-sm'>
                          Save{' '}
                          {Math.round(
                            ((product.old_price - product.new_price) /
                              product.old_price) *
                              100
                          )}
                          %
                        </p>
                      )}
                      <p className='text-sm text-green-500'>
                        {product.available ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className='text-gray-500'>
                  No products available in this category.
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomeProducts;
