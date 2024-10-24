import { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: '',
    brand: '',
    old_price: '',
    new_price: '',
    rating: '',
    category: '',
    images: null,
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories(response.data.map((cat) => cat.name));
        setLoadingCategories(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProductDetails({ ...productDetails, images: e.target.files });
  };

  const AddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productDetails.name);
    formData.append('description', productDetails.description);
    formData.append('old_price', productDetails.old_price);
    formData.append('new_price', productDetails.new_price);
    formData.append('brand', productDetails.brand);
    formData.append('category', productDetails.category || 'NEW');

    if (productDetails.images) {
      for (let i = 0; i < productDetails.images.length; i++) {
        formData.append('images', productDetails.images[i]);
      }
    }

    try {
      await axios.post('http://localhost:3001/products', formData, {
        withCredentials: true,
      });
      setProductDetails({
        name: '',
        description: '',
        old_price: '',
        new_price: '',
        brand: '',
        category: '',
        images: null,
      });
      alert('Product added');
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <div className='flex items-center justify-center mt-5 mx-auto '>
      <div className='bg-slate-200  rounded-lg'>
        <h1 className='text-2xl mb-5 ml-5 text-center'>Add New Product</h1>
        <div className='flex flex-col'>
          <label className='ml-5 text-gray-500'>Product Name</label>
          <input
            className='border border-gray-300 h-10 rounded-lg my-2 mx-4'
            type='text'
            name='name'
            placeholder='Type here'
            value={productDetails.name}
            onChange={handleChange}
          />
          <label className='ml-5 text-gray-500'>Old Price</label>
          <input
            className='border border-gray-300 h-10 rounded-lg my-2 mx-4'
            type='text'
            name='old_price'
            placeholder='Type here'
            value={productDetails.old_price}
            onChange={handleChange}
          />
          <label className='ml-5 text-gray-500'>New Price</label>
          <input
            className='border border-gray-300 h-10 rounded-lg my-2 mx-4'
            type='text'
            name='new_price'
            placeholder='Type here'
            value={productDetails.new_price}
            onChange={handleChange}
          />
          <label className='ml-5 text-gray-500'>Brand</label>
          <input
            className='border border-gray-300 h-10 rounded-lg my-2 mx-4'
            type='text'
            name='brand'
            placeholder='Type here'
            value={productDetails.brand}
            onChange={handleChange}
          />
          <label className='ml-5 text-gray-500'>Category</label>
          <select
            className='border border-gray-300 h-10 rounded-lg my-2 mx-4'
            value={productDetails.category}
            onChange={handleChange}
            name='category'
          >
            <option value=''>Choose a category</option>
            {loadingCategories ? (
              <option>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))
            )}
          </select>
          <label className='ml-6 text-gray-500'>Image</label>
          <input
            className='border-gray-300 rounded-lg my-2 mx-6'
            type='file'
            multiple
            onChange={handleFileChange}
          />
          <label className='ml-6 text-gray-500'>Description</label>
          <textarea
            className='border-gray-300 rounded-lg my-2 mx-6'
            cols='30'
            rows='2'
            name='description'
            placeholder='Type here'
            value={productDetails.description}
            onChange={handleChange}
          ></textarea>
          <button
            className='bg-slate-700 rounded-lg text-white h-8 w-[100px] ml-6 mb-2 mt-2'
            onClick={AddProduct}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
