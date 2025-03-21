'use client';
import { useDispatch, useSelector } from "react-redux";
import SingleCartItem from "@/components/SingleCartItem";
import { orderFormOpen } from "@/components/api/cartHandler";
import { useEffect } from "react";
import { getTotals } from "@/components/api/cartSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import EmptyCart from "@/components/EmptyCart";
import { useRouter } from "next/navigation";
// import FooterBanner from "@/components/FooterBanner"
import OrderForm from "@/components/OrderForm";
import { RootState } from "@/reduxToolKit/store";
import { CartItem } from "@/types/cart";

const HomePage = () => {

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const navigate= useRouter()

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
            {formCondition && <OrderForm></OrderForm>}
            <div>
                <div className="flex cursor-cell hover:bg-gray-200 hover:text-gray-500 flex-col items-center justify-center w-full pb-4 bg-gray-500 text-gray-200 h-32 lg:h-52 duration-300">
                    <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold font-abc">
                        Shopping Cart
                    </h1>
                </div>

                {cart?.cartItems?.length === 0 && <EmptyCart />}

                {cart?.cartItems?.length > 0 && (
                    <div className="container mx-auto">
                        <div className="py-8">
                            {/* // need to modify these two line of code  col-span-12 md:col-span-4 col-span-12 md:col-span-8*/}

                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-4">
                                    <p className="font-normal text-lg leading-8 text-gray-400">
                                        Product Details
                                    </p>
                                </div>
                                <div className="col-span-12 md:col-span-8">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                Quantity
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                Size
                                            </p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                Total
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {cart?.cartItems.map((item: CartItem) => (
                                <SingleCartItem
                                    // totalPrice={setTotalPrice}
                                    key={item.id}
                                    product={item}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {cart?.cartItems?.length > 0 && (
                    <div>
                        <div className="flex sm:justify-end justify-center mt-4 mx-auto container">
                            <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
                                <div className="flex gap-2 text-black justify-between">
                                    <h1 className="text-2xl font-thin ">Subtotal</h1>
                                    <h1 className="text-2xl">{cart.cartTotalAmount} Taka</h1>
                                </div>
                                <p className="text-sm text-gray-400">
                                    Shipping Charge will calculate in Checkout
                                </p>
                                <p  onClick={() => dispatch(orderFormOpen())} className="cursor-pointer bg-indigo-600 text-white rounded-md p-2 font-semibold text-center">
                                    Checkout
                                </p>
                                <div onClick={()=>navigate.push('/')} className="text-indigo-500 cursor-pointer flex gap-2 items-center">
                                    <FaArrowLeftLong />{" "}
                                    <span  className="mb-[2px] ">Continue Shopping</span>
                                </div>
                            </div>
                        </div>
                        {/* // purchase button  */}
                        <div className="container mx-auto mt-8">
                            <div
                                onClick={() => dispatch(orderFormOpen())}
                                className="bottom-16 md-block border hover:text-gray-200 text-indigo-600  border-indigo-600 flex rounded-lg justify-center bg-indigo-100 cursor-pointer shadow-md hover:bg-indigo-600 transition duration-500"
                            >
                                <p className="text-xl text-center p-4 font-semibold">
                                    ক্যাশ অন ডেলিভারি করিতে ক্লিক করুন
                                </p>
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
