import React from "react";
import "../globals.css";
import {ReduxProvider} from "@/reduxToolKit/providers/provider";

export default function RootLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
            <div>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </div>
        </body>
        </html>
    );
}
