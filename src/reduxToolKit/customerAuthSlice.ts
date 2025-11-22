import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// Types
interface Customer {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  isVerified: boolean;
  createdAt?: string;
  lastLoginAt?: string;
}

interface CustomerAuthState {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean;
  otpPhone: string | null;
}

const initialState: CustomerAuthState = {
  customer: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false,
  otpPhone: null,
};

// Load auth data from localStorage on initialization
const loadAuthFromStorage = (): CustomerAuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('customerToken');
    const customer = localStorage.getItem('customerData');
    
    if (token && customer) {
      try {
        return {
          customer: JSON.parse(customer),
          token,
          isAuthenticated: true,
          loading: false,
          error: null,
          otpSent: false,
          otpPhone: null,
        };
      } catch {
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerData');
      }
    }
  }
  return initialState;
};

// Initialize auth state
const initializeAuthState = loadAuthFromStorage();

const customerAuthSlice = createSlice({
  name: "customerAuth",
  initialState: initializeAuthState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOtpState: (state) => {
      state.otpSent = false;
      state.otpPhone = null;
    },
    logout: (state) => {
      state.customer = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.otpPhone = null;
      
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('customerToken');
        localStorage.removeItem('customerData');
      }
    },
    setAuthData: (state, action: PayloadAction<{ customer: Customer; token: string }>) => {
      state.customer = action.payload.customer;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('customerToken', action.payload.token);
        localStorage.setItem('customerData', JSON.stringify(action.payload.customer));
      }
    },
    setOtpSent: (state, action: PayloadAction<{ phone: string }>) => {
      state.otpSent = true;
      state.otpPhone = action.payload.phone;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Export actions
export const {
  clearError,
  clearOtpState,
  logout,
  setAuthData,
  setOtpSent,
  setLoading,
  setError
} = customerAuthSlice.actions;

// Selectors
export const selectCustomer = (state: RootState) => state.customerAuth.customer;
export const selectCustomerToken = (state: RootState) => state.customerAuth.token;
export const selectIsCustomerAuthenticated = (state: RootState) => state.customerAuth.isAuthenticated;
export const selectCustomerLoading = (state: RootState) => state.customerAuth.loading;
export const selectCustomerError = (state: RootState) => state.customerAuth.error;
export const selectOtpSent = (state: RootState) => state.customerAuth.otpSent;
export const selectOtpPhone = (state: RootState) => state.customerAuth.otpPhone;

// Thunk for handling OTP verification success
export const handleOtpVerificationSuccess = createAsyncThunk(
  'customerAuth/otpVerificationSuccess',
  async ({ customer, token }: { customer: Customer; token: string }, { dispatch }) => {
    dispatch(setAuthData({ customer, token }));
    return { customer, token };
  }
);

export default customerAuthSlice.reducer;