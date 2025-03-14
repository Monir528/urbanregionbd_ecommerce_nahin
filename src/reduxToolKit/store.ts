// src/store.ts
"use client";

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/components/api/userApi";
import { productApi } from "@/components/api/productApi";
import orderProductSlice from "@/components/api/orderProductSlice";
import cartHandler from "@/components/cartHandler";
import productSlice from "@/components/api/productSlice";
import categorySlice from "@/components/api/categorySlice";
import cardOrderSlice from "@/components/api/cardOrderSlice";
import cartSlice from "@/components/api/cartSlice";
import popUpSlice from "@/components/api/quickViewSlice";
import sizeModal from "@/components/api/sizeModalSlice";
import totalCount from "@/components/api/reviewSlice";
import { apiSlice } from "@/components/api/apiSlice";
import { confirmOrder } from "@/components/confirmOrder";
import authReducer from "@/reduxToolKit/authSlice"; // Import authSlice

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [confirmOrder.reducerPath]: confirmOrder.reducer,
        auth: authReducer, // Add auth reducer
        cardOrder: cardOrderSlice,
        order: orderProductSlice,
        cartHandler,
        productSlice,
        categorySlice,
        cart: cartSlice,
        popUp: popUpSlice,
        size: sizeModal,
        totalCount,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(productApi.middleware)
            .concat(confirmOrder.middleware),
});

// Export types for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
