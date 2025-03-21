import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_ROOT_API,
});

export const garbageApi = createApi({
  reducerPath: "garbageApi",
  baseQuery,
  tagTypes: ["Garbages"],
  endpoints: (builder) => ({
    getGarbage: builder.query({
      query: () => "/getGarbage",
      providesTags: ["Garbages"],
    }),

    addGarbage: builder.mutation({
      query: (data) => ({
        url: "/addGarbage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Garbages"],
    }),

    deleteGarbage: builder.mutation({
      query: (id) => ({
        url: `/deleteGarbage/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Garbages"],
    }),
  }),
});

export const {
  useGetGarbageQuery,
  useAddGarbageMutation,
  useDeleteGarbageMutation,
} = garbageApi;
