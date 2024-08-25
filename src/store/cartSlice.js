import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  loadCartItemFromStorage,
  saveCartItemFromStorage,
} from "../utils/mangeLoacalStorage";

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.sellingPrice;
  }, 0);
};

const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);
};
let initialState = {
  cartItems: loadCartItemFromStorage() || [],
  totalPrice: 0,
  totalQuantity: 0,
};
initialState.totalPrice = calculateTotalPrice(initialState.cartItems);
initialState.totalQuantity = calculateTotalQuantity(initialState.cartItems);

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isProductExist = state.cartItems.some(
        (item) => item._id === action.payload._id
      );
      if (isProductExist) {
        toast.error("Product already exists");
      } else {
        const product = action.payload;
        const addQuantity = {
          ...product,
          quantity: 1,
          totalPrice: product.sellingPrice,
        };
        state.cartItems = [...state.cartItems, addQuantity];
        saveCartItemFromStorage(state.cartItems);
        state.totalPrice = calculateTotalPrice(state.cartItems);
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
      }
    },
    incrementQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (state.cartItems[index].quantity < 5) {
        state.cartItems[index].quantity++;
        state.cartItems[index].totalPrice =
          state.cartItems[index].quantity * state.cartItems[index].sellingPrice;
        saveCartItemFromStorage(state.cartItems);
        state.totalPrice = calculateTotalPrice(state.cartItems);
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (state.cartItems[index].quantity > 1) {
        state.cartItems[index].quantity--;
        state.cartItems[index].totalPrice =
          state.cartItems[index].quantity * state.cartItems[index].sellingPrice;
        saveCartItemFromStorage(state.cartItems);
        state.totalPrice = calculateTotalPrice(state.cartItems);
        state.totalQuantity = calculateTotalQuantity(state.cartItems);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      saveCartItemFromStorage(state.cartItems);
      state.totalPrice = calculateTotalPrice(state.cartItems);
      state.totalQuantity = calculateTotalQuantity(state.cartItems);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartReducer.actions;

export default cartReducer.reducer;
