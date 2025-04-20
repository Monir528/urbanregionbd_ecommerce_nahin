"use client";

import "../globals.css";
import { ReduxProvider } from "@/reduxToolKit/providers/provider";
import AdminProtected from "@/reduxToolKit/providers/AdminProtected";
import Sidebar from "@/components/Sidebar"; // Import Sidebar component

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <title>Urban Region BD</title>
            <meta name="description" content="Luxury designer bags for every occasion" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />
        </head>
        <body className="flex flex-col min-h-screen text-gray-900">
        <ReduxProvider>
            <AdminProtected>
                <div className="flex">
                    <Sidebar />
                    <div className="min-h-screen flex-1 p-7 bg-white">{children}</div>
                </div>
            </AdminProtected>
        </ReduxProvider>
        </body>
        </html>
    );
}
