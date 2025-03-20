"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, initializeAuth } from "@/reduxToolKit/authSlice";
import { RootState, AppDispatch } from "@/reduxToolKit/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Run authentication check on page load
    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    // Redirect if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/admin/overview");
        }
    }, [isAuthenticated, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));
        console.log("login result", result, 'user data:', user);
        if (loginUser.fulfilled.match(result)) {
            router.push("/admin/overview");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <div className="flex justify-center mb-6">
                    <Image src="/urbanregion.svg" alt="Urban Region Logo" width={100} height={100} />
                </div>
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
                    Welcome to the Admin Panel
                </h2>
                <p className="text-center text-gray-600 mb-6">Please log in to continue</p>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
