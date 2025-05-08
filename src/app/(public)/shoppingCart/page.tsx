'use client';
import { useDispatch, useSelector } from "react-redux";
import SingleCartItem from "@/components/SingleCartItem";
import { orderFormOpen } from "@/components/api/cartHandler";
import { useEffect } from "react";
import { getTotals } from "@/components/api/cartSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import EmptyCart from "@/components/EmptyCart";
import { useRouter } from "next/navigation";
import OrderForm from "@/components/OrderForm";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import { RootState } from "@/reduxToolKit/store";
import { CartItem } from "@/types/cart";
import React from "react";

const HomePage = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const navigate= useRouter()
    const [showSuccess, setShowSuccess] = React.useState(false);

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // const [totalPrice, setTotalPrice] = useState(0);
    const { formCondition } = useSelector((state: RootState) => state.cartHandler);

    // console.log(totalPrice);
    return (
        <main>
            {/* <OrderSuccessModal open={showSuccess} onClose={() => {
                setShowSuccess(false);
                navigate.push("/");
            }} /> */}
            {formCondition && <OrderForm />}
            <div>
                <div className="flex cursor-cell hover:bg-gray-200 hover:text-gray-500 flex-col items-center justify-center w-full pb-4 bg-gray-500 text-gray-200 h-32 lg:h-52 duration-300 rounded-t-lg shadow-md mb-4">
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold font-abc">
                        Shopping Cart
                    </h1>
                </div>

                {cart?.cartItems?.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <EmptyCart />
                    <p className="text-lg font-semibold text-gray-500">Your cart is empty!</p>
                  </div>
                )}

                {cart?.cartItems?.length > 0 && (
                    <div className="flex flex-col-reverse md:flex-row gap-6 bg-transparent px-2 md:px-8 w-full max-w-7xl mx-auto">
                        {/* Cart Items Section */}
                        <div className="flex-1 min-w-0">
                            <div className="divide-y divide-gray-200">
                                <div className="flex flex-col gap-4">
                                    {cart?.cartItems.map((item: CartItem) => (
                                        <SingleCartItem key={item.id} product={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Cart Summary & Actions Section */}
                        <div className="w-full md:max-w-xs flex-shrink-0 mb-6 md:mb-0">
                            <div className="bg-white rounded-lg p-6 flex flex-col gap-4 border border-gray-300">
                                <div className="flex gap-2 text-black justify-between items-center border-b pb-2">
                                    <span className="text-xl font-medium">Subtotal</span>
                                    <span className="text-xl font-bold">{cart.cartTotalAmount} Taka</span>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Shipping Charge will calculate in Checkout
                                </p>
                                <button onClick={() => dispatch(orderFormOpen())} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition mb-2">
                                    Checkout
                                </button>
                                <button onClick={()=>navigate.push('/')} className="w-full bg-white border border-indigo-600 text-indigo-600 font-semibold py-2 rounded-lg hover:bg-indigo-50 transition">
                                    <span className="flex items-center justify-center gap-2">
                                        <FaArrowLeftLong /> Continue Shopping
                                    </span>
                                </button>
                            </div>
                            {/* Purchase Button (COD) */}
                            <div className="mt-6">
                                <button
                                    onClick={() => dispatch(orderFormOpen())}
                                    className="w-full border border-indigo-600 text-indigo-600 font-bold py-3 rounded-lg bg-indigo-100 hover:bg-indigo-600 hover:text-white shadow-md transition duration-500"
                                >
                                    ক্যাশ অন ডেলিভারি করিতে ক্লিক করুন
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-16"></div>
                {/*<FooterBanner></FooterBanner>*/}
            </div>
        </main>

    );
};

export default HomePage;
