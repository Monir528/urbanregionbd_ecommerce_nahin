"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useRouter } from "next/navigation";
import { initializeAuth } from "../authSlice";
import { ReactNode } from "react";

interface AdminProtectedProps {
    children: ReactNode;
}

const AdminProtected = ({ children }: AdminProtectedProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

    // Local loading state to prevent premature redirection
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        dispatch(initializeAuth()).then(() => {
            setAuthChecked(true); // Mark authentication check as completed
        });
    }, [dispatch]);

    useEffect(() => {
        if (authChecked) {
            console.log("admin protected user", user);
            if (!loading && !isAuthenticated) {
                router.push("../auth/login"); // Redirect after authentication check completes
            }
        }
    }, [authChecked, loading, isAuthenticated, router, user]);

    if (loading || !authChecked) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white">
                {/* Loading Text */}
                <p className="mb-4 text-lg text-gray-700 font-semibold">Loading...</p>

                {/* Linear Progress Bar */}
                <div className="w-48 h-1 bg-gray-200 rounded overflow-hidden relative">
                    <div className="h-full w-1/2 bg-blue-600 animate-slide"></div>
                </div>

                {/* Animation Styles */}
                <style jsx>{`
                    @keyframes slide {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-slide {
                        animation: slide 1.5s infinite linear;
                    }
                `}</style>
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AdminProtected;
