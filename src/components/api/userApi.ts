import {apiSlice} from "../api/apiSlice"

export const usersApi= apiSlice.injectEndpoints({
    tagTypes: ['Users', 'User'],
    endpoints:(builder)=>({
        addUser:builder.mutation({
            query:(data)=>({
                url:"/addUser",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Users"]
        }),

        getUsers:builder.query({
            query:()=>({
                url:"/getUser",
                method:"GET",
            }),
            providesTags:["Users"]
        }),
        getSingleUser:builder.query({
            query:({_id})=>({
                url:`/getUser/${_id}`,
                method:"GET",
            }),
            providesTags:["User"]
        }),
        editUser:builder.mutation({
            query:({_id,data})=>(
                {
                url:`/editUser/${_id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags: (result, error, arg) => [
                "Users",
                { type: "User", id: arg._id },
              ],
        }),
        deleteUser:builder.mutation({
            query:(_id)=>({
                url:`/deleteUser/${_id}`,
                method:"DELETE",
            }),
            invalidatesTags:["Users"]
        })
    })
}) 
export const {useAddUserMutation, useGetSingleUserQuery,useGetUsersQuery, useEditUserMutation, useDeleteUserMutation}=usersApi
;