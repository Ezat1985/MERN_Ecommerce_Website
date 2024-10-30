const addToCart = (cart, newProduct) => {
  const existingProduct = cart.find((item) => item._id === newProduct._id);

  if (existingProduct) {
    return cart.map((item) =>
      item._id === newProduct._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cart, { ...newProduct, quantity: 1 }];
  }
};

const removeFromCart = (cart, newProduct) => {
  const existingProduct = cart.find((item) => item._id === newProduct._id);

  if (existingProduct.quantity === 1) {
    return cart.filter((item) => item._id !== newProduct._id);
  } else {
    return cart.map((item) =>
      item._id === newProduct._id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }
};

export { addToCart, removeFromCart };
