// src/api/userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Fix: Ensure the correct environment variable is used
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ROOT_API, // 🔥 Must start with NEXT_PUBLIC_
});

// ✅ Fix: Create a separate `usersApi` slice (Do not inject into `apiSlice`)
export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery,
    tagTypes: ["Users", "User"],
    endpoints: (builder) => ({
        // Fetch all users
        getUsers: builder.query({
            query: () => "/getUsers",
            providesTags: ["Users"],
        }),

        // Fetch a single user by ID
        getSingleUser: builder.query({
            query: (id) => `/getUser/${id}`,
            providesTags: (result, error, arg) => [{ type: "User", id: arg }],
        }),

        // Add a new user
        addUser: builder.mutation({
            query: (data) => ({
                url: "/addUser",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),

        // Edit an existing user
        editUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/editUser/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "Users",
                { type: "User", id: arg.id },
            ],
        }),

        // Delete a user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/deleteUser/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

// ✅ Export API Hooks
export const {
    useGetUsersQuery,
    useGetSingleUserQuery,
    useAddUserMutation,
    useEditUserMutation,
    useDeleteUserMutation,
} = usersApi;
