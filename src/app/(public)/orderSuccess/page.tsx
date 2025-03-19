'use client';
import Link from 'next/link';

const OrderSuccess = () => {
    return (
        <main>
            <div className="flex h-[75vh] justify-center items-center mt-20 md:mt-12">
                <div className="max-w-[500px] text-center">
                    <i className="fas fa-check-circle text-[100px] text-green-500 mb-8"></i>
                    <h1 className="text-4xl mb-5 text-gray-700">Thank you for your order!</h1>
                    <p className="text-xl mb-10 text-gray-800">
                        Your order has been received and is being processed. You will receive
                        an email confirmation shortly.
                    </p>
                    <Link
                        className="inline-block bg-green-500 text-white py-2 px-8 rounded no-underline transition-colors duration-300 hover:bg-green-600"
                        href="/"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default OrderSuccess;