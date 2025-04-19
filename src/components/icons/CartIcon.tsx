"use client";

import { useRouter } from "next/navigation";
import { RiShoppingCartFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import type { RootState } from "@/reduxToolKit/store";

const CartIcon = () => {
    const router = useRouter();
    const cartTotalQuantity = useSelector((state: RootState) => state.cart.cartTotalQuantity);
    const redirect = () => {
        router.push('/shoppingCart');
    };
    return (
        <div>
            <div onClick={redirect} className="fixed bottom-[50%] z-50 right-2">
                <div className="relative">
                    <RiShoppingCartFill className="cursor-pointer text-2xl h-12 w-12 p-2 rounded-md text-white bg-gray-600" />
                    {cartTotalQuantity > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold border border-white">
                            {cartTotalQuantity}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartIcon;