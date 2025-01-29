// src/api/usersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query with the base URL
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable for the base URL
});

// Create the API slice
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["Users", "User"],
    endpoints: (builder) => ({}),
});

// Inject user-specific endpoints into the API slice
export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Add a new user
        addUser: builder.mutation({
            query: (data) => ({
                url: "/addUser",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),

        // Fetch all users
        getUsers: builder.query({
            query: () => ({
                url: "/getUsers", // Plural URL for fetching multiple users
                method: "GET",
            }),
            providesTags: ["Users"],
        }),

        // Fetch a single user by ID
        getSingleUser: builder.query({
            query: ({ _id }) => ({
                url: `/getUser/${_id}`,
                method: "GET",
            }),
            providesTags: (result, error, arg) => [{ type: "User", id: arg._id }], // Dynamic tagging
        }),

        // Edit an existing user
        editUser: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/editUser/${_id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "Users",
                { type: "User", id: arg._id },
            ],
        }),

        // Delete a user
        deleteUser: builder.mutation({
            query: (_id) => ({
                url: `/deleteUser/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useAddUserMutation,
    useGetUsersQuery,
    useGetSingleUserQuery,
    useEditUserMutation,
    useDeleteUserMutation,
} = usersApi;