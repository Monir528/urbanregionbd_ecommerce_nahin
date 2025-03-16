import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ROOT_API, // Must start with NEXT_PUBLIC_
});


interface Order {
    id: string;
    status: string;
    // Other fields...
}

export const orderApi = createApi({
    reducerPath: "orderApi", // Unique reducer path
    tagTypes: ["Orders", "Order"],
    baseQuery: baseQuery,
    refetchOnFocus: true, // Kept as is
    endpoints: (builder) => ({
        purchaseOrder: builder.mutation({
            query: (data) => ({
                url: "/confirmOrder",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Orders"],
        }),
        getSingleOrder: builder.query<Order, string>({
            query: (id) => ({
                url: `/singleOrder/${id}`, // Renamed parameter to 'id'
                method: "GET", // Explicitly defined
            }),
            providesTags: (result, error, id) => [{ type: "Order", id }],
        }),
        getAllOrdered: builder.query({
            query: () => ({
                url: "/orderedProduct",
                method: "GET", // Explicitly defined
            }),
            providesTags: ["Orders"],
        }),
        editOrder: builder.mutation({
            query: ({ id, status }) => ({
                url: "/singleOrder",
                method: "PUT",
                body: { status, id },
            }),
            invalidatesTags: (result, error, { id }) => [
                "Orders",
                { type: "Order", id },
            ],
        }),
    }),
});

export const {
    useGetSingleOrderQuery,
    useGetAllOrderedQuery,
    usePurchaseOrderMutation,
    useEditOrderMutation,
} = orderApi;