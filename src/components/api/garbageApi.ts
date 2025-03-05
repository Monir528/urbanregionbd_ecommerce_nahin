import { apiSlice } from "../api/apiSlice";

export const garbageApi = apiSlice.injectEndpoints({
  tagTypes: ["garbages"],

  endpoints: (builder) => ({
    getGarbage: builder.query({
      query: () => "/getGarbage",
      providesTags: ["garbages"],
    }),

    addGarbage: builder.mutation({
      query: (data) => ({
        url: "/addGarbage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["garbages"],
    }),

    deleteGarbage: builder.mutation({
      query: (id) => ({
        url: `/deleteGarbage/${id}`,
        method: "DELETE",
      }),
    }),
    invalidatesTags: ["garbages"],
  }),
});

export const {
    useGetGarbageQuery,
    useAddGarbageMutation,
    useDeleteGarbageMutation
} = garbageApi;
