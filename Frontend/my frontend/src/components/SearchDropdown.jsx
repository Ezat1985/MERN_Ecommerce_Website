/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const SearchDropdown = ({ results, onClose }) => {
  return (
    <div className='absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg mt-1 p-4 z-50 max-h-64 overflow-y-auto'>
      {results.length > 0 ? (
        results.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            onClick={onClose}
            className='flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md transition'
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className='w-16 h-16 object-cover rounded-md'
            />
            <div className='text-sm'>
              <p className='font-semibold'>{product.name}</p>
              <p className='text-gray-500'>{product.brand}</p>
              <p className='text-green-500'>${product.new_price}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className='text-center text-gray-500'>No results found</p>
      )}
    </div>
  );
};

export default SearchDropdown;
