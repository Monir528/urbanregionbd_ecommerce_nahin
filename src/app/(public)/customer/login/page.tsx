"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/reduxToolKit/store";
import { useSendOtpMutation } from "@/components/api/authApi";
import { setOtpSent, setError, selectCustomerError, selectOtpSent, selectOtpPhone } from "@/reduxToolKit/customerAuthSlice";

export default function CustomerLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux state
  const error = useSelector(selectCustomerError);
  const otpSent = useSelector(selectOtpSent);
  const otpPhone = useSelector(selectOtpPhone);
  
  // Local state
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  
  // RTK Query hooks
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  
  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  // Redirect if OTP already sent
  useEffect(() => {
    if (otpSent && otpPhone) {
      router.push(`/customer/verify-otp?phone=${encodeURIComponent(otpPhone)}&type=login`);
    }
  }, [otpSent, otpPhone, router]);
  
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (error) {
      dispatch(setError(""));
    }
  };
  
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  // Make handleRecaptchaChange available globally for reCAPTCHA callback
  useEffect(() => {
    (window as Window & typeof globalThis & { handleRecaptchaChange?: (token: string | null) => void }).handleRecaptchaChange = handleRecaptchaChange;
    return () => {
      delete (window as Window & typeof globalThis & { handleRecaptchaChange?: (token: string | null) => void }).handleRecaptchaChange;
    };
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number
    if (!phone || phone.length < 10) {
      dispatch(setError("Please enter a valid phone number"));
      return;
    }
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      dispatch(setError("Please complete the reCAPTCHA"));
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await sendOtp({ 
        phone: phone.startsWith('+') ? phone : `+${phone}`, 
        type: 'login' 
      }).unwrap();
      
      if (result.success) {
        dispatch(setOtpSent({ phone: result.phone }));
      } else {
        dispatch(setError(result.message || "Failed to send OTP"));
      }
    } catch (error: unknown) {
      console.error("Send OTP error:", error);
      const message = typeof error === 'object' && error !== null && 'data' in error && (error as { data?: { message?: string } }).data?.message
        ? (error as { data?: { message?: string } }).data!.message!
        : "Failed to send OTP. Please try again.";
      dispatch(setError(message));
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
            Customer Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your phone number to receive an OTP
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Phone Number Input */}
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <PhoneInput
                country={"bd"}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phone",
                  required: true,
                  className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500",
                }}
                containerClass="w-full"
                buttonClass="border border-gray-300"
                dropdownClass="bg-white border border-gray-300 rounded-md shadow-lg"
                inputStyle={{
                  width: "100%",
                  height: "42px",
                  fontSize: "16px",
                }}
                enableSearch={true}
                disableSearchIcon={false}
                searchPlaceholder="Search country..."
                searchNotFound="No country found"
                countryCodeEditable={false}
                preferredCountries={["bd"]}
                onlyCountries={["bd"]}
                placeholder="Enter phone number"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter your Bangladeshi phone number
              </p>
            </div>
            
            {/* reCAPTCHA */}
            <div className="mb-4">
              <div className="g-recaptcha" 
                   data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} 
                   data-callback="handleRecaptchaChange"
                   data-expired-callback="handleRecaptchaChange"></div>
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
              disabled={loading || isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading || isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        </form>
        
        {/* Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/customer/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href="/order-tracking" className="font-medium text-blue-600 hover:text-blue-500">
              Track your order
            </Link>
          </p>
        </div>
        
        {/* reCAPTCHA Notice */}
        <p className="text-xs text-gray-500 text-center mt-4">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" className="text-blue-600 hover:text-blue-500" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}