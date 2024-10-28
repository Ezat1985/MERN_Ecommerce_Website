import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [priceRange, setPriceRange] = useState([100, 100000]);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/categories?name=${category}`
        );
        const categoryData = response.data.find((cat) => cat.name === category);

        if (categoryData && categoryData.products) {
          setProducts(categoryData.products);
        } else {
          setError('No products found in this category.');
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        setError('Failed to fetch category data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);

  const handleMinPriceChange = (e) => {
    setPriceRange([parseInt(e.target.value), priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    setPriceRange([priceRange[0], parseInt(e.target.value)]);
  };

  const handleRatingChange = (rating) => {
    setRatingFilter(rating);
  };

  const filteredProducts = products.filter((product) => {
    const newPrice = parseFloat(product.new_price.replace(/[^\d]/g, '')) || 0;
    return (
      newPrice >= priceRange[0] &&
      newPrice <= priceRange[1] &&
      (!ratingFilter || product.rating >= ratingFilter)
    );
  });

  return (
    <div className='flex container mx-auto p-4'>
      <div className='w-1/4 p-4 bg-base-200 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Product Categories</h3>
        <ul className='space-y-2'>
          <li>
            <input type='radio' name='category' value='Men' className='radio' />{' '}
            Men
          </li>
          <li>
            <input
              type='radio'
              name='category'
              value='Women'
              className='radio'
            />{' '}
            Women
          </li>
          <li>
            <input
              type='radio'
              name='category'
              value='Computers'
              className='radio'
            />{' '}
            Computers and Accessories
          </li>
          <li>
            <input
              type='radio'
              name='category'
              value='Smart Watch Accessories'
              className='radio'
            />{' '}
            Smart Watch Accessories
          </li>
          <li>
            <input
              type='radio'
              name='category'
              value='Mobiles'
              className='radio'
            />{' '}
            Mobiles
          </li>
        </ul>

        <h3 className='text-lg font-semibold mt-6'>Filter by Price</h3>
        <div className='flex items-center gap-2 mt-2'>
          <input
            type='number'
            min={100}
            max={100000}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className='input input-bordered w-24'
          />
          <span>to</span>
          <input
            type='number'
            min={100}
            max={100000}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className='input input-bordered w-24'
          />
        </div>
        <div className='flex justify-between mt-4'>
          <input
            type='range'
            min={100}
            max={100000}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className='slider w-1/2'
          />
          <input
            type='range'
            min={100}
            max={100000}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className='slider w-1/2'
          />
        </div>

        <h3 className='text-lg font-semibold mt-6'>Filter by Rating</h3>
        <div className='flex flex-col space-y-2'>
          {[5, 4, 3, 2, 1].map((star) => (
            <label key={star} className='flex items-center'>
              <input
                type='radio'
                name='rating'
                onChange={() => handleRatingChange(star)}
                className='radio radio-primary mr-2'
              />
              <span>{'⭐'.repeat(star)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className='w-3/4 p-4'>
        <h2 className='text-2xl mb-4 text-center capitalize'>{category}</h2>
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
        ) : error ? (
          <p className='text-red-500 text-center'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className='card w-80 bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300'
              >
                <figure>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='w-full h-48 object-cover rounded-md'
                  />
                </figure>
                <div className='card-body'>
                  <h3 className='text-lg font-semibold truncate'>
                    {product.name}
                  </h3>
                  <p className='text-gray-500 text-sm line-through'>
                    $ Old Price {product.old_price}
                  </p>
                  <p className='text-green-600 font-bold'>
                    $ {product.new_price}
                  </p>
                  <p className='text-green-600 text-xs'>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div className='flex items-center mt-2'>
                    {'⭐'.repeat(product.rating)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
