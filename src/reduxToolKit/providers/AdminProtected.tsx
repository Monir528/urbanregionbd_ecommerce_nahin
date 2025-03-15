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
        return <p>Loading...</p>; // Prevent rendering before authentication state is confirmed
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AdminProtected;
