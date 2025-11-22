"use client";

import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "@/components/api/userApi";
import { productApi } from "@/components/api/productApi";
import { categoryApi } from "@/components/api/categoryApi";
import { subCategoryApi } from "@/components/api/subCategoryApi"; 
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
import { confirmOrder } from "@/components/api/confirmOrder/confirmOrder";
import authReducer from "@/reduxToolKit/authSlice";
import carouselImagesReducer from "@/reduxToolKit/carouselImagesSlice";
import customerReducer from "@/components/api/customerSlice";
import customerAuthReducer from "@/reduxToolKit/customerAuthSlice";
import { customerAuthApi } from "@/components/api/authApi";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [subCategoryApi.reducerPath]: subCategoryApi.reducer, 
        [confirmOrder.reducerPath]: confirmOrder.reducer,
        [customerAuthApi.reducerPath]: customerAuthApi.reducer,
        auth: authReducer,
        cardOrder: cardOrderSlice,
        order: orderProductSlice,
        cartHandler,
        productSlice,
        categorySlice,
        cart: cartSlice,
        popUp: popUpSlice,
        size: sizeModal,
        totalCount,
        carouselImages: carouselImagesReducer,
        customer: customerReducer,
        customerAuth: customerAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(usersApi.middleware)
            .concat(productApi.middleware)
            .concat(categoryApi.middleware)
            .concat(subCategoryApi.middleware) 
            .concat(confirmOrder.middleware)
            .concat(customerAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;