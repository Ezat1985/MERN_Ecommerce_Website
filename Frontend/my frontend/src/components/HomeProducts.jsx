import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomeProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`http://localhost:3001/categories?limit=5`);
        if (!res.ok) throw new Error('Fetching categories failed');

        const data = await res.json();
        setCategoryProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories with products:', error);
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Our Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        categoryProducts.map((category) => (
          <div key={category._id} className='mb-10'>
            <h2 className='text-xl font-semibold mb-2'>{category.name}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              {category.products && category.products.length > 0 ? (
                category.products.map((product) => (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className='card bg-slate-100 shadow-lg p-5 flex flex-col'
                  >
                    <figure className='flex justify-center items-center h-40'>
                      <img
                        src={
                          product.images && product.images.length > 0
                            ? product.images[0]
                            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
                        }
                        alt={product.name}
                        className='max-h-full max-w-full object-cover'
                      />
                    </figure>
                    <div className='card-body p-4'>
                      <h3 className='card-title text-lg font-medium leading-tight'>
                        {product.brand} {product.name}
                      </h3>
                      <p className='text-green-600 font-bold'>
                        ${product.new_price}
                      </p>
                      {product.old_price && (
                        <p className='text-gray-500 line-through'>
                          ${product.old_price}
                        </p>
                      )}
                      {product.old_price && product.new_price && (
                        <p className='text-red-500 text-sm'>
                          Save{' '}
                          {Math.round(
                            ((parseFloat(product.old_price) -
                              parseFloat(product.new_price)) /
                              parseFloat(product.old_price)) *
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
