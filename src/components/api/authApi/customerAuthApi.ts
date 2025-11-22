import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/reduxToolKit/store";

// Customer Authentication API using RTK Query
export const customerAuthApi = createApi({
  reducerPath: "customerAuthApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_ROOT_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).customerAuth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Customer", "CustomerOrders"],
  endpoints: (builder) => ({
    // Send OTP for login/registration
    sendOtp: builder.mutation({
      query: ({ phone, type = 'login' }) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: { phone, type },
      }),
    }),

    // Verify OTP and authenticate
    verifyOtp: builder.mutation({
      query: ({ phone, otp, name, email }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: { phone, otp, name, email },
      }),
    }),

    // Get customer profile
    getCustomerProfile: builder.query({
      query: () => ({
        url: "/auth/customer/profile",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    // Get orders by phone (for tracking)
    getOrdersByPhone: builder.query({
      query: (phone) => ({
        url: `/orders/by-phone/${phone}`,
        method: "GET",
      }),
      providesTags: ["CustomerOrders"],
    }),

    // Customer logout
    customerLogout: builder.mutation({
      query: () => ({
        url: "/auth/customer/logout",
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetCustomerProfileQuery,
  useGetOrdersByPhoneQuery,
  useCustomerLogoutMutation,
} = customerAuthApi;

// Export the API slice (already exported above via 'export const customerAuthApi')