"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetOrdersByPhoneQuery } from "@/components/api/authApi";
import OrderStatusTimeline from "@/components/OrderStatusTimeline";

const formatToBDPhone = (input: string) => {
  const digits = input.replace(/[^0-9+]/g, "");
  if (digits.startsWith("+880")) return digits;
  const normalized = digits.replace(/^0+/, "");
  return `+880${normalized}`;
};

// Types
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

export default function OrderTrackingPage() {
  const [searchType, setSearchType] = useState<"orderId" | "phone">("orderId");
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  
  const router = useRouter();

  // Only fetch when we have a valid phone number
  const { data: orders, isLoading, error } = useGetOrdersByPhoneQuery(
    searchType === "phone" && searchValue ? formatToBDPhone(searchValue) : "",
    { 
      skip: searchType !== "phone" || !searchValue,
      refetchOnMountOrArgChange: true 
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      return;
    }

    setIsSearched(true);
  };

  const handleOrderIdSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      return;
    }

    // Navigate to the specific order page
    router.push(`/order/${orderId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-gray-600">Check your order status by Order ID or Phone Number</p>
        </div>

        {/* Search Type Selector */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-lg border border-gray-200 p-1">
              <button
                type="button"
                onClick={() => setSearchType("orderId")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  searchType === "orderId"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Track by Order ID
              </button>
              <button
                type="button"
                onClick={() => setSearchType("phone")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  searchType === "phone"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Track by Phone
              </button>
            </div>
          </div>

          {/* Order ID Search */}
          {searchType === "orderId" && (
            <form onSubmit={handleOrderIdSearch} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., ORD-123456)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Track Order
              </button>
            </form>
          )}

          {/* Phone Search */}
          {searchType === "phone" && (
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setSearchValue(e.target.value);
                  }}
                  placeholder="Enter your phone number (e.g., 01612345678)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Find Orders
              </button>
            </form>
          )}
        </div>

        {/* Search Results */}
        {isSearched && searchType === "phone" && (
          <div className="bg-white rounded-lg shadow-sm">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching for orders...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <div className="text-red-600 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">We couldn&apos;t find any orders associated with this phone number.</p>
              </div>
            ) : orders && orders.length > 0 ? (
              <div>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Found {orders.length} order{orders.length !== 1 ? "s" : ""}
                  </h2>
                  <p className="text-gray-600 mt-1">For phone: {formatToBDPhone(searchValue)}</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {orders.map((order: Order) => (
                    <div key={order._id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{order.orderId}</h3>
                          <p className="text-sm text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Customer</p>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{formatToBDPhone(order.customerPhone)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Total Amount</p>
                          <p className="text-lg font-semibold text-gray-900">৳{order.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Order Items</p>
                        <div className="space-y-2">
                          {order.items.map((item: OrderItem, index: number) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.name} x{item.quantity}</span>
                              <span className="text-gray-900">৳{item.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <OrderStatusTimeline currentStatus={order.status} />
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => router.push(`/order/${order.orderId}`)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => window.open(`/invoice/${order.orderId}`, '_blank')}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">We couldn&apos;t find any orders associated with this phone number.</p>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-indigo-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
              <p className="text-sm text-gray-600">+88 01648141727</p>
              <p className="text-sm text-gray-600">9 AM - 9 PM</p>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
              <p className="text-sm text-gray-600">support@urbanregionbd.com</p>
              <p className="text-sm text-gray-600">24/7 Support</p>
            </div>
            <div className="text-center">
              <div className="text-indigo-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Live Chat</h3>
              <p className="text-sm text-gray-600">Available on Website</p>
              <p className="text-sm text-gray-600">10 AM - 6 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}