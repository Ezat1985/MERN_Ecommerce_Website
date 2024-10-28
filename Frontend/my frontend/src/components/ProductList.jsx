import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdModeEditOutline } from 'react-icons/md';
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineClose,
} from 'react-icons/ai';

const predefinedCategories = [
  { id: '671bbf0f51c2b9852e51a041', name: 'TV' },
  { id: '671f8f7e5a89cda7f8972d31', name: 'Smartphone' },
  { id: '671bbea351c2b9852e51a01a', name: 'Console' },
  { id: '671bbecd51c2b9852e51a025', name: 'Laptop' },
  { id: '671bbedc51c2b9852e51a02c', name: 'Tablet' },
  { id: '671bbefa51c2b9852e51a03a', name: 'Fashion' },
  { id: '671bbf0f51c2b9852e51a041', name: 'Audio' },
  { id: '671bbf2b51c2b9852e51a048', name: 'Camera' },
  { id: '671bbf1b51c2b9852e51a04f', name: 'Gaming' },
  { id: '671bbf2b51c2b9852e51a04f', name: 'Accessories' },
  { id: '671bbf2b51c2b9852e51a050', name: 'NEW' },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products', {
          withCredentials: true,
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setEditedProduct(product);
  };

  const handleCancelClick = () => {
    setEditProductId(null); // Exit edit mode without saving
    setEditedProduct({}); // Clear edited product data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      available: e.target.value === 'true',
    }));
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:3001/products/${editProductId}`,
        editedProduct,
        {
          withCredentials: true,
        }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProductId ? editedProduct : product
        )
      );
      setEditProductId(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`, {
        withCredentials: true,
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = predefinedCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>Select</th>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Category</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan='10'>Loading...</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <input type='checkbox' className='checkbox' />
                </td>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img
                          src={product.images && product.images[0]}
                          alt={product.name}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {editProductId === product._id ? (
                    <input
                      type='text'
                      name='name'
                      value={editedProduct.name}
                      onChange={handleInputChange}
                      className='input input-bordered input-sm w-full max-w-xs'
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <input
                      type='text'
                      name='brand'
                      value={editedProduct.brand}
                      onChange={handleInputChange}
                      className='input input-bordered input-sm w-full max-w-xs'
                    />
                  ) : (
                    product.brand
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <textarea
                      name='description'
                      value={editedProduct.description}
                      onChange={handleInputChange}
                      className='textarea textarea-bordered w-full max-w-xs'
                    ></textarea>
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <input
                      type='text'
                      name='old_price'
                      value={editedProduct.old_price}
                      onChange={handleInputChange}
                      className='input input-bordered input-sm w-full max-w-xs'
                    />
                  ) : (
                    product.old_price
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <input
                      type='text'
                      name='new_price'
                      value={editedProduct.new_price}
                      onChange={handleInputChange}
                      className='input input-bordered input-sm w-full max-w-xs'
                    />
                  ) : (
                    product.new_price
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <select
                      name='category'
                      value={editedProduct.category}
                      onChange={handleInputChange}
                      className='input input-bordered input-sm w-full max-w-xs'
                    >
                      {predefinedCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    getCategoryName(product.category)
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <select
                      name='available'
                      value={editedProduct.available}
                      onChange={handleAvailabilityChange}
                      className='input input-bordered input-sm w-full max-w-xs'
                    >
                      <option value='true'>Yes</option>
                      <option value='false'>No</option>
                    </select>
                  ) : product.available ? (
                    'Yes'
                  ) : (
                    'No'
                  )}
                </td>
                <td>
                  {editProductId === product._id ? (
                    <>
                      <button onClick={handleSaveClick} className='text-xl'>
                        <AiOutlineCheck className='text-green-500' />
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className='text-xl ml-2'
                      >
                        <AiOutlineClose className='text-gray-500' />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product)}
                        className='text-xl'
                      >
                        <MdModeEditOutline className='text-blue-500' />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product._id)}
                        className='text-xl text-red-500 ml-2'
                      >
                        <AiOutlineDelete />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
