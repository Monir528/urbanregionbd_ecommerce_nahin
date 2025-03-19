import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ROOT_API,
});

export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi",
  baseQuery,
  tagTypes: ["SubCategories"],
  endpoints: (builder) => ({
    getSubCategory: builder.query({
      query: () => "/getSubCategory",
      providesTags: ["SubCategories"],
    }),
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "/addSubCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategories"],
    }),
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/deleteSubCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategories"],
    }),
    // New endpoint for updating a subcategory
    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateSubCategory/${id}`, // Adjust URL based on your backend
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SubCategories"],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} = subCategoryApi;