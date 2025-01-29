import "../globals.css";
import { ToastContainer } from "react-toastify";
import CartIcon from "@/components/icons/CartIcon";
import OrderForm from "@/components/OrderForm";
import {NavBarProvider} from "@/context/NavBarContext";
import Navbar from "@/components/Navbar/Navbar";
import {ReduxProvider} from "@/components/ReduxProvider";
// import FacebookChat from "@/components/FacebookChat";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <html lang="en">
            {/* Global <head> Section */}
            <head>
                <title>Fenxobd</title>
                <meta name="description" content="Luxury designer bags for every occasion" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="flex flex-col min-h-screen">

                        <ReduxProvider>
                            <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
                                <ToastContainer />
                                <div>
                                    <NavBarProvider>
                                        <Navbar></Navbar>
                                    </NavBarProvider>
                        {/*            /!*{formCondition && <OrderForm></OrderForm>}*!/*/}
                        {/*            <OrderForm></OrderForm>*/}
                        {/*            <CartIcon></CartIcon>*/}
                        {/*            {children}*/}

                        {/*            /!*<FacebookChat></FacebookChat>*!/*/}
                                    {children}
                                </div>
                            </div>

                        </ReduxProvider>

            </body>
        </html>
    );
}