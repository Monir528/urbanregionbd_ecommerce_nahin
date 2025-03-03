import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/getCategories",
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: "/createCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/deleteCategory/${id}`,
        method: "DELETE",
      }),
    }),
    invalidatesTags: ["Category"],
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
