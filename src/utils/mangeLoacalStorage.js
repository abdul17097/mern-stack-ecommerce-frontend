export const loadCartItemFromStorage = () => {
  try {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    return cartItems;
  } catch (error) {
    return [];
  }
};
export const saveCartItemFromStorage = (cartItems) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};
