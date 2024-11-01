// import { useState, useEffect } from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const FakeCheckout = ({ setCart }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     email: '',
//   });
//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [totalCost, setTotalCost] = useState(0);

//   useEffect(() => {
//     setTotalCost(50);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOrder = () => {
//     setOrderPlaced(true);
//     setCart([]);
//   };

//   return (
//     <div className='container mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500 mt-8 bg-slate-200'>
//       <div className='p-4'>
//         <h2 className='text-2xl font-semibold mb-4 text-center'>Checkout</h2>
//         {!orderPlaced ? (
//           <form onSubmit={(e) => e.preventDefault()}>
//             <div className='mb-4'>
//               <label className='mb-2 block'>Name:</label>
//               <input
//                 type='text'
//                 name='name'
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className='border rounded w-full p-2'
//               />
//             </div>

//             <div className='mb-4'>
//               <label className='mb-2 block'>Address:</label>
//               <input
//                 type='text'
//                 name='address'
//                 value={formData.address}
//                 onChange={handleChange}
//                 required
//                 className='border rounded w-full p-2'
//               />
//             </div>
//             <div className='mb-4'>
//               <label className='mb-2 block'>Email:</label>
//               <input
//                 type='email'
//                 name='email'
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className='border rounded w-full p-2'
//               />
//             </div>

//             <PayPalScriptProvider
//               options={{
//                 'client-id':
//                   'ARTJD83_v4H0fbxwOLR98FCxeOOf5bzdVOXMiokYapQv6InMHnZuAibSFLnMOgw3YSemIemjqG531G3K',
//               }}
//             >
//               <div className='my-4'>
//                 <h3 className='text-lg font-semibold'>PayPal Checkout</h3>
//                 <PayPalButtons
//                   style={{ layout: 'vertical' }}
//                   createOrder={(data, actions) => {
//                     return actions.order.create({
//                       purchase_units: [
//                         {
//                           amount: {
//                             value: totalCost.toString(),
//                           },
//                         },
//                       ],
//                     });
//                   }}
//                   onApprove={(data, actions) => {
//                     return actions.order.capture().then((details) => {
//                       alert(
//                         `Transaction completed by ${details.payer.name.given_name}`
//                       );
//                       handleOrder();
//                     });
//                   }}
//                   onError={(err) => {
//                     console.error('PayPal Checkout error:', err);
//                     alert(
//                       'An error occurred with the payment. Please try again.'
//                     );
//                   }}
//                 />
//               </div>
//             </PayPalScriptProvider>

//             <button
//               type='button'
//               onClick={handleOrder}
//               className='bg-blue-500 text-white text-sm rounded p-2 mt-2 mx-40'
//             >
//               Place Order without PayPal
//             </button>
//           </form>
//         ) : (
//           <div className='text-center'>
//             <h3 className='p-5'>Order Confirmed!</h3>
//             <p>Thank you for your order, {formData.name}!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FakeCheckout;
