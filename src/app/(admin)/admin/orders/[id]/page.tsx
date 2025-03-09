"use client";

import { useParams } from "next/navigation";
import { useGetSingleOrderQuery } from "@/components/api/confirmOrder/confirmOrder";

const ViewOrder = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSingleOrderQuery(id);

    const {
        _id,
        address,
        date,
        division,
        email,
        name,
        phone,
        status,
        total,
        orderedItem,
        payment,
    } = data || {};

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
            {/* Page Title */}
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Order Details</h2>

            {/* Loading State */}
            {isLoading && <p className="text-center text-gray-500 mt-4">Loading...</p>}

            {/* Order Information */}
            {!isLoading && data && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {/* Customer Details */}
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-4">Customer Details</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p><span className="font-medium">Full Name:</span> {name}</p>
                            <p><span className="font-medium">Phone:</span> {phone}</p>
                            <p><span className="font-medium">Email:</span> {email}</p>
                            <p><span className="font-medium">Address:</span> {address}, {division}</p>
                            <p><span className="font-medium">Order Date:</span> {date}</p>
                            <p><span className="font-medium">Payment:</span> {payment?.phone}</p>
                            <p><span className="font-medium">Transaction ID:</span> {payment?.transId}</p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white shadow-md rounded-lg p-5">
                        <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-4">Order Summary</h3>
                        <div className="flex justify-between text-sm text-gray-600">
                            <p><span className="font-medium">Total Amount:</span></p>
                            <p className="font-semibold text-indigo-600">{total} Taka</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-3">
                            <p><span className="font-medium">Order Status:</span></p>
                            <p className={`font-semibold px-3 py-1 rounded-md text-white ${
                                status === "pending" ? "bg-yellow-500" :
                                    status === "failed" ? "bg-red-500" :
                                        status === "delivered" ? "bg-green-500" :
                                            status === "received" ? "bg-blue-500" : "bg-gray-400"
                            }`}>
                                {status}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Ordered Items */}
            {!isLoading && orderedItem?.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-700 border-b pb-2">Ordered Items</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {orderedItem.map((item, index) => (
                            <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                                <img className="w-20 h-20 object-cover rounded-lg" src={item?.image} alt={item?.name} />
                                <h4 className="text-xs font-medium text-gray-800 mt-2">{item.name}</h4>
                                <p className="text-gray-500 text-xs">Size: {item.id?.split(">>>")[1]}</p>
                                <p className="text-gray-500 text-xs">Order ID: {item.id?.split(">>>")[0]}</p>
                                <div className="w-full mt-2 flex justify-between text-xs text-gray-600">
                                    <p><span className="font-semibold">Unit Price:</span> {item.price} Taka</p>
                                    <p><span className="font-semibold">Qty:</span> {item.cartQuantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewOrder;
