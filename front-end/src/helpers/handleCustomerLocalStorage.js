const handleLocalStorage = (cartItem) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  const filteredCart = shoppingCart.filter((currCart) => currCart.id !== cartItem.id);
  if (cartItem.quantity === '0') {
    return localStorage.setItem('shoppingCart', JSON.stringify(filteredCart));
  }
  if (!shoppingCart.some((cart) => cart.id === cartItem.id)) {
    localStorage.setItem('shoppingCart', JSON.stringify([...shoppingCart, cartItem]));
  } else {
    const newShoppingCart = shoppingCart.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity = cartItem.quantity;
        item.subTotal = cartItem.subTotal;
      }
      return item;
    });
    localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
  }
};

export default handleLocalStorage;
