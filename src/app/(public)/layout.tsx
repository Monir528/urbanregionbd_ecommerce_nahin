import "../globals.css";
import { ToastContainer } from "react-toastify";
import CartIcon from "@/components/icons/CartIcon";
import OrderForm from "@/components/OrderForm";
import {NavBarProvider} from "@/context/NavBarContext";
import Navbar from "@/components/Navbar/Navbar";
import {ReduxProvider} from "@/reduxToolKit/providers/provider";
import FooterBanner from "@/components/FooterBanner";
import {useSelector} from "react-redux";
// import FacebookChat from "@/components/FacebookChat";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    // const { formCondition } = useSelector((state) => state.cartHandler);

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
                            <NavBarProvider>
                            <div className="bg-white duration-200 overflow-hidden">
                                <ToastContainer />
                                <div>
                                    <Navbar></Navbar>

                                    {/*{formCondition && <OrderForm></OrderForm>}*/}
                        {/*            <OrderForm></OrderForm>*/}
                        {/*            <CartIcon></CartIcon>*/}
                        {/*            {children}*/}

                        {/*            /!*<FacebookChat></FacebookChat>*!/*/}
                                    {children}
                                </div>
                                <FooterBanner></FooterBanner>
                            </div>
                            </NavBarProvider>
                        </ReduxProvider>

            </body>
        </html>
    );
}