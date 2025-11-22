"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../reduxToolKit/store";
import { logout, selectCustomer } from "../../../../reduxToolKit/customerAuthSlice";
import { useGetOrdersByPhoneQuery } from "../../../../components/api/authApi";

// Components
// Local timeline component to avoid module resolution issues
const OrderStatusTimeline: React.FC<{ currentStatus: string }> = ({ currentStatus }) => {
  const statuses = [
    { key: 'received', label: 'Received' },
    { key: 'pending', label: 'Pending' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];
  const currentIndex = statuses.findIndex(s => s.key === currentStatus);
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
          <div className="h-full bg-blue-500" style={{ width: `${(Math.max(currentIndex,0) / (statuses.length - 1)) * 100}%` }} />
        </div>
        <div className="relative flex justify-between">
          {statuses.map((s, i) => (
            <div key={s.key} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${i <= currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}>{i+1}</div>
              <div className={`mt-2 text-xs ${i <= currentIndex ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Types
import type { Order } from "../../../../types/order";

export default function CustomerDashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux state
  const customer = useSelector(selectCustomer);
  
  // Local state
  const [activeTab, setActiveTab] = useState<'history' | 'tracking'>('history');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersByPhoneQuery(
    customer?.phone || '',
    { skip: !customer?.phone }
  );
  
  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };
  
  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString('en-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusColor = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'packed': 'bg-purple-100 text-purple-800',
      'shipped': 'bg-indigo-100 text-indigo-800',
      'out-for-delivery': 'bg-orange-100 text-orange-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };
  
  if (ordersLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to access your dashboard</h2>
          <Link
            href="/customer/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/urbanregion.svg"
                  alt="Urban Region BD"
                  width={40}
                  height={40}
                  className="cursor-pointer"
                />
              </Link>
              <h1 className="ml-4 text-2xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {customer.name || customer.phone}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {customer.name ? customer.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {customer.name || 'Customer'}
                </h3>
                <p className="text-sm text-gray-600">{customer.phone}</p>
                {customer.email && (
                  <p className="text-sm text-gray-600">{customer.email}</p>
                )}
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Purchase History
                </button>
                <button
                  onClick={() => setActiveTab('tracking')}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'tracking'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Track Orders
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Purchase History</h2>
                </div>
                <div className="p-6">
                  {ordersData?.orders && ordersData.orders.length > 0 ? (
                    <div className="space-y-4">
                      {ordersData.orders.map((order: Order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">Order #{order._id}</h3>
                              <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                              </span>
                              <p className="text-lg font-semibold text-gray-900 mt-1">৳{order.total}</p>
                            </div>
                          </div>
                          
                          {order.orderedItem && order.orderedItem.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-1">Items:</p>
                              <div className="space-y-1">
                                {order.orderedItem.slice(0, 3).map((item: Order['orderedItem'][number], index: number) => (
                                  <div key={index} className="flex justify-between text-sm">
                                    <span>{item.name} x{item.cartQuantity}</span>
                                    <span>৳{Number(item.price) * item.cartQuantity}</span>
                                  </div>
                                ))}
                                {order.orderedItem.length > 3 && (
                                  <p className="text-xs text-gray-500">+{order.orderedItem.length - 3} more items</p>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => router.push(`/order-tracking?orderId=${order._id}`)}
                              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Track Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'tracking' && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Track Your Orders</h2>
                </div>
                <div className="p-6">
                  {ordersData?.orders && ordersData.orders.length > 0 ? (
                    <div className="space-y-6">
                      {ordersData.orders.map((order: Order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-gray-900">Order #{order._id}</h3>
                              <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                            </div>
                            <div className="text-right">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                              </span>
                              <p className="text-lg font-semibold text-gray-900 mt-1">৳{order.total}</p>
                            </div>
                          </div>
                          
                          {/* Order Status Timeline */}
                          <div className="mb-4">
                            <OrderStatusTimeline currentStatus={order.status} />
                          </div>
                          
                          {selectedOrder?._id === order._id && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">Order Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Status:</span>
                                  <span className="font-medium">{order.status}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Payment:</span>
                                  <span className="font-medium">{order.payment?.transId ? `Paid (${order.payment.transId})` : 'Cash on Delivery'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Total Amount:</span>
                                  <span className="font-medium">৳{order.total}</span>
                                </div>
                                {order.address && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery Address:</span>
                                    <span className="font-medium text-right">{order.address}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mt-4">
                            <button
                              onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                            </button>
                            <Link
                              href={`/order-tracking?orderId=${order._id}`}
                              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Full Tracking
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No orders to track</h3>
                      <p className="text-gray-600 mb-4">Place an order to track its status here</p>
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}