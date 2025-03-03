import { apiSlice } from "../api/apiSlice";

export const subCategoryApi = apiSlice.injectEndpoints({
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

  }),
});

export const {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoryQuery
} = subCategoryApi;
