import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ROOT_API, // 🔥 Must start with NEXT_PUBLIC_
});

export const confirmOrder= createApi({
    reducerPath: "api",
    tagTypes: ['Orders', 'Order'],
    baseQuery: baseQuery,
    refetchOnFocus: true,
    endpoints:(builder)=>({
        purchaseOrder:builder.mutation({
            query:(data)=>({
                url:"/confirmOrder",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Orders"]
        }),
        getSingleOrder:builder.query({
            query:(data)=>({
                 url:`/singleOrder/${data}`
            }),
            providesTags:(result, error, arg)=>[
                {type:"Order", id:arg}
            ]
        }),
        getAllOrdered:builder.query({
            query:()=>({
                url:'/orderedProduct'
            }),
            providesTags: ['Orders'],
        }),
        editOrder:builder.mutation({
            query:({id, status})=>({
                url:`/singleOrder`,
                method:"PUT",
                body:{status, id}
            }),
            invalidatesTags:(result, error, arg)=>[
                "Orders",
                {type:"Order", id:arg.id}
            ]
        })
    })
})
export const { useGetSingleOrderQuery, useGetAllOrderedQuery, usePurchaseOrderMutation, useEditOrderMutation}=confirmOrder
;

