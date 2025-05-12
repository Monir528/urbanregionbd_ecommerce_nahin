"use client";

import { CartItem } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CartIcon, BagIcon } from "./cartToastIcons";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";

const getInitialState = () => ({
  cartItems: getLocalStorage<CartItem[]>("cartItems", []),
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
  reducers: {
    addToCart(state, action) {

      console.log("action payload", action.payload)
      const existingIndex = state.cartItems.findIndex(
          (item: CartItem) => item.id === action.payload.id
      );

      console.log("existing index", existingIndex);

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        toast.info("You have added another item of this product! 🛒", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: CartIcon
        });
      } else {
        const tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        toast.success("Item successfully added to your cart! 🛍️", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: BagIcon
        });
      }
      setLocalStorage("cartItems", state.cartItems);
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
          (item: CartItem) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info("Decreased product quantity", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
            (item: CartItem) => item.id !== action.payload.id
        );
        toast.error("Product removed from cart", {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      setLocalStorage("cartItems", state.cartItems);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
          (item: CartItem) => item.id !== action.payload.id
      );
      setLocalStorage("cartItems", state.cartItems);
      toast.error("Product removed from cart", {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
          (cartTotal: { total: number; quantity: number }, cartItem: CartItem) => ({
            total: cartTotal.total + parseFloat(cartItem.price) * cartItem.cartQuantity,
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
      state.cartTotalQuantity = 0;
      setLocalStorage("cartItems", []);
      toast.error("Cart cleared", {});
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;
export default cartSlice.reducer;