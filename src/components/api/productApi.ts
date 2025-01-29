// src/api/productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query with the base URL
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable for the base URL
});

// Create the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({}),
});

// Inject product-specific endpoints into the API slice
export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products
    getProducts: builder.query({
      query: () => `/getProducts`,
      providesTags: ["Products"],
    }),

    // Fetch a single product by ID
    getSingleProduct: builder.query({
      query: (id) => `/getProduct/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),

    // Fetch selected products (using POST for filtering)
    getSelectedProduct: builder.query({
      query: (data) => ({
        url: `/getSelectedProduct`,
        method: "POST",
        body: data,
      }),
    }),

    // Add a new product
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/uploadProduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // Edit an existing product
    editProduct: builder.mutation({
      query: ({ productId, productObj }) => ({
        url: `/editProduct/${productId}`,
        method: "PUT",
        body: productObj,
      }),
      invalidatesTags: (result, error, arg) => [
        "Products",
        { type: "Product", id: arg.productId },
      ],
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // Fetch related products by category
    getRelatedProduct: builder.query({
      query: (query) => ({
        url: `/relatedProduct`,
        params: { category: query },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetSelectedProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetRelatedProductQuery,
} = productApi;