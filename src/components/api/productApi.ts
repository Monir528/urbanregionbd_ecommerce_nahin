import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/getProducts`,
      providesTags: ["Products"],
    }),

    getSingleProduct: builder.query({
      query: (id) => `/getProduct/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
    }),
    getSelectedProduct: builder.mutation({
      query: (data) => ({
        url: `/getSelectedProduct`,
        method: "POST",
        body: data,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/uploadProduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/getProducts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getRelatedProduct: builder.query({
      query: (query) => ({
        url: `/relatedProduct?category=${query}`,
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetSingleProductQuery,
  useGetProductsQuery,
  useEditProductMutation,
  useDeleteProductMutation,
  useGetSelectedProductMutation,
  useGetRelatedProductQuery,
} = productApi;

