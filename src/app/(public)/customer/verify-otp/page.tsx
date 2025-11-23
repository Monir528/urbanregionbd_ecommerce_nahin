"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/reduxToolKit/store";
import { useVerifyOtpMutation } from "@/components/api/authApi";
import { handleOtpVerificationSuccess, setError, selectCustomerError } from "@/reduxToolKit/customerAuthSlice";

export default function CustomerVerifyOtpPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Redux state
  const error = useSelector(selectCustomerError);
  
  // Local state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  
  // RTK Query hooks
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    setPhone(sp.get('phone') || '');
    setType(sp.get('type') || 'login');
    setName(sp.get('name') || '');
    setEmail(sp.get('email') || '');
  }, []);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);
  
  // Auto-focus next input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
    
    // Clear error
    if (error) {
      dispatch(setError(""));
    }
  };
  
  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      dispatch(setError("Please enter a complete 6-digit OTP"));
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await verifyOtp({ 
        phone, 
        otp: otpString,
        ...(type === 'register' && { name, email })
      }).unwrap();
      
      if (result.success) {
        // Store auth data in Redux and redirect
        dispatch(handleOtpVerificationSuccess({
          customer: result.customer,
          token: result.token
        }));
        
        // Redirect to dashboard
        router.push('/customer/dashboard');
      } else {
        dispatch(setError(result.message || "Failed to verify OTP"));
      }
    } catch (error: unknown) {
      console.error("Verify OTP error:", error);
      const message = typeof error === 'object' && error !== null && 'data' in error && (error as { data?: { message?: string } }).data?.message
        ? (error as { data?: { message?: string } }).data!.message!
        : "Failed to verify OTP. Please try again.";
      dispatch(setError(message));
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOtp = async () => {
    if (!canResend) return;
    
    // Reset timer
    setResendTimer(45);
    setCanResend(false);
    
    // Resend OTP logic would be implemented here
    // For now, we'll just reset the timer
    dispatch(setError(""));
  };
  
  const formatPhoneNumber = (phone: string) => {
    // Format phone number for display
    if (phone.startsWith('+880')) {
      return phone;
    }
    return `+880${phone.replace(/^0+/, '')}`;
  };
  
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center text-gray-700">Loading...</div>
        </div>
      }
    >
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/">
            <Image
              src="/urbanregion.svg"
              alt="Urban Region BD"
              width={120}
              height={120}
              className="mx-auto cursor-pointer"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {type === 'register' ? 'Complete Registration' : 'Verify Phone Number'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;ve sent a verification code to {formatPhoneNumber(phone)}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* OTP Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter 6-digit code
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={loading || isLoading}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to your phone
              </p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isLoading || otp.join("").length !== 6}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading || isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                type === 'register' ? 'Complete Registration' : 'Verify OTP'
              )}
            </button>
            
            {/* Resend OTP */}
            <div className="text-center mt-4">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-600">
                  Resend OTP in {resendTimer}s
                </p>
              )}
            </div>
          </div>
        </form>
        
        {/* Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            {type === 'register' ? (
              <>
                Already have an account?{" "}
                <Link href="/customer/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in here
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link href="/customer/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Register here
                </Link>
              </>
            )}
          </p>
          <p className="text-sm text-gray-600">
            <Link href="/order-tracking" className="font-medium text-blue-600 hover:text-blue-500">
              Track your order
            </Link>
          </p>
        </div>
      </div>
    </div>
    </Suspense>
  );
}
