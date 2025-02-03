"use client";

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/components/api/userApi";
import { productApi } from "@/components/api/productApi"; // ✅ Added
import orderProductSlice from "@/components/api/orderProductSlice";
import cartHandler from "@/components/cartHandler";
import productSlice from "@/components/api/productSlice";
import categorySlice from "@/components/api/categorySlice";
import cardOrderSlice from "@/components/api/cardOrderSlice";
import cartSlice from "@/components/api/cartSlice";
import popUpSlice from "@/components/api/quickViewSlice";
import sizeModal from "@/components/api/sizeModalSlice";
import totalCount from "@/components/api/reviewSlice";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [productApi.reducerPath]: productApi.reducer, // ✅ Added `productApi` reducer
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
            .concat(usersApi.middleware) // ✅ Ensuring usersApi middleware
            .concat(productApi.middleware), // ✅ Ensuring productApi middleware
});
