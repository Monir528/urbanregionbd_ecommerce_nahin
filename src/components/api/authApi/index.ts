import * as auth from "./customerAuthApi";

export const customerAuthApi = auth.customerAuthApi;
export const useSendOtpMutation = auth.useSendOtpMutation;
export const useVerifyOtpMutation = auth.useVerifyOtpMutation;
export const useGetCustomerProfileQuery = auth.useGetCustomerProfileQuery;
export const useGetOrdersByPhoneQuery = auth.useGetOrdersByPhoneQuery;
export const useCustomerLogoutMutation = auth.useCustomerLogoutMutation;