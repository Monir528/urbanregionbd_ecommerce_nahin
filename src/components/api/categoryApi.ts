import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query with the API root URL
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ROOT_API, // Adjust based on your env setup
});

// Create the category API slice
export const categoryApi = createApi({
  reducerPath: "categoryApi", // Unique key for this API’s state in the store
  baseQuery,
  tagTypes: ["Category"], // Tags for cache management
  endpoints: (builder) => ({
    // Fetch all categories
    getCategory: builder.query({
      query: () => "/getCategories",
      providesTags: ["Category"], // Tags this query provides
    }),

    // Add a new category
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/createCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"], // Invalidates cache on mutation
    }),

    // Delete a category by ID
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/deleteCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"], // Invalidates cache on mutation
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;