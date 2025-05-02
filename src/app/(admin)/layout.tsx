"use client";

import "../globals.css";
import { ReduxProvider } from "@/reduxToolKit/providers/provider";
import AdminProtected from "@/reduxToolKit/providers/AdminProtected";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component
import { useState, useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    // Check if on mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <html lang="en">
        <head>
            <title>Urban Region BD</title>
            <meta name="description" content="Luxury designer bags for every occasion" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <ReduxProvider>
            <AdminProtected>
                <div className="flex flex-col md:flex-row min-h-screen w-full">
                    {!isMobile && <Sidebar />}
                    <div className="flex-1 transition-all duration-300 overflow-x-hidden">
                        <main className="p-4 md:p-6 lg:p-8">
                            {children}
                        </main>
                    </div>
                    {isMobile && <Sidebar />}
                </div>
            </AdminProtected>
        </ReduxProvider>
        </body>
        </html>
    );
}
