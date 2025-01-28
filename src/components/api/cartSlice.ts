"use client";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const savedItems = localStorage.getItem("cartItems");
    return {
      cartItems: savedItems ? JSON.parse(savedItems) : [],
      cartTotalQuantity: 0,
      cartTotalAmount: 0,
    };
  }
  return {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  };
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
        );
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      toast.error("Product removed from cart", {
        position: "bottom-left",
      });
    },
    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
          (cartTotal, cartItem) => ({
            total: cartTotal.total + cartItem.price * cartItem.cartQuantity,
            quantity: cartTotal.quantity + cartItem.cartQuantity,
          }),
          {
            total: 0,
            quantity: 0,
          }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },
    clearCart(state) {
      state.cartItems = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem("cartItems", JSON.stringify([]));
      }
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;