"use client";

import { useRouter } from "next/navigation";
import { RiShoppingCartFill } from "react-icons/ri";


const CartIcon = () => {
    const router= useRouter()
    const redirect=()=>{
        router.push('/shoppingCart')
    }
    return (
        <div>
        <div onClick={redirect} className="fixed bottom-[50%] z-50 right-2">
            <RiShoppingCartFill className=" cursor-pointer text-2xl h-12 w-12 p-2 rounded-md text-white bg-gray-600"/>
            
        </div>
        </div>
    );
};

export default CartIcon;