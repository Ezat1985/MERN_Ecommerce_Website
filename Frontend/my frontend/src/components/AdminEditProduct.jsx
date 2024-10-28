// import { useState } from 'react';
// import axios from 'axios';
// import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';

// const ProductRow = ({ product, onProductUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [productDetails, setProductDetails] = useState(product);

//   const handleEditToggle = () => {
//     if (isEditing) {
//       updateProduct(); // Save changes when clicking the checkmark
//     }
//     setIsEditing(!isEditing); // Toggle edit mode
//   };

//   const handleChange = (e) => {
//     setProductDetails({
//       ...productDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const updateProduct = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3001/products/${product._id}`,
//         productDetails,
//         {
//           withCredentials: true,
//         }
//       );
//       onProductUpdate(productDetails); // Inform parent component of update
//       setIsEditing(false); // Exit edit mode
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   return (
//     <tr>
//       <td>
//         <img
//           src={
//             product.images && product.images.length > 0
//               ? product.images[0]
//               : 'https://via.placeholder.com/50'
//           }
//           alt='Product'
//           style={{ width: 50, height: 50 }}
//         />
//       </td>
//       <td>
//         {isEditing ? (
//           <input
//             type='text'
//             name='name'
//             value={productDetails.name}
//             onChange={handleChange}
//             className='border rounded p-1'
//           />
//         ) : (
//           product.name
//         )}
//       </td>
//       <td>
//         {isEditing ? (
//           <input
//             type='text'
//             name='brand'
//             value={productDetails.brand}
//             onChange={handleChange}
//             className='border rounded p-1'
//           />
//         ) : (
//           product.brand
//         )}
//       </td>
//       <td>
//         {isEditing ? (
//           <input
//             type='text'
//             name='old_price'
//             value={productDetails.old_price}
//             onChange={handleChange}
//             className='border rounded p-1'
//           />
//         ) : (
//           product.old_price
//         )}
//       </td>
//       <td>
//         {isEditing ? (
//           <input
//             type='text'
//             name='new_price'
//             value={productDetails.new_price}
//             onChange={handleChange}
//             className='border rounded p-1'
//           />
//         ) : (
//           product.new_price
//         )}
//       </td>
//       <td>
//         {isEditing ? (
//           <select
//             name='category'
//             value={productDetails.category}
//             onChange={handleChange}
//             className='border rounded p-1'
//           >
//             {/* Replace with actual category options */}
//             <option value=''>Select Category</option>
//             <option value='Category1'>Category1</option>
//             <option value='Category2'>Category2</option>
//           </select>
//         ) : (
//           product.category // Display category name instead of ID if available
//         )}
//       </td>
//       <td>
//         <button onClick={handleEditToggle} className='text-xl'>
//           {isEditing ? (
//             <AiOutlineCheck className='text-green-500' />
//           ) : (
//             <AiOutlineEdit />
//           )}
//         </button>
//       </td>
//     </tr>
//   );
// };

// const AdminEditProductsTable = ({ products, onProductUpdate }) => {
//   return (
//     <table className='min-w-full bg-gray-800 text-white'>
//       <thead>
//         <tr>
//           <th>Product Image</th>
//           <th>Product Name</th>
//           <th>Brand</th>
//           <th>Old Price</th>
//           <th>New Price</th>
//           <th>Category</th>
//           <th>Edit</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product) => (
//           <ProductRow
//             key={product._id}
//             product={product}
//             onProductUpdate={onProductUpdate}
//           />
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default AdminEditProductsTable;
