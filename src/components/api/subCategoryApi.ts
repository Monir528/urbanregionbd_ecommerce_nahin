import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query with the API root URL
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ROOT_API, // Ensure this matches your env setup
});

// Create the subCategory API slice
export const subCategoryApi = createApi({
  reducerPath: "subCategoryApi", // Unique key for this API’s state in the store
  baseQuery,
  tagTypes: ["SubCategories"], // Tags for cache management
  endpoints: (builder) => ({
    // Fetch all subcategories
    getSubCategory: builder.query({
      query: () => "/getSubCategory",
      providesTags: ["SubCategories"], // Tags this query provides
    }),

    // Add a new subcategory
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "/addSubCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategories"], // Invalidates cache on mutation
    }),

    // Delete a subcategory by ID
    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/deleteSubCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategories"], // Invalidates cache on mutation
    }),
  }),
});

// Export hooks for use in components
export const {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoryQuery,
} = subCategoryApi;