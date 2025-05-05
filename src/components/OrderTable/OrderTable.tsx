import OrderTableBody from "../OrderTableBody/OrderTableBody";
import BulkDownloadButton from '../OrderTableBody/BulkDownloadButton';
import { useGetAllOrderedQuery } from "@/components/api/confirmOrder/confirmOrder";
import { useState, useEffect } from "react";
import {Order} from "@/types/order";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

// Hybrid parser: handles dd/mm/yyyy, mm/dd/yyyy, and ambiguous cases
function parseOrderDate(dateString: string): Date {
    if (!dateString) return new Date('');
    // Remove time part (after comma or space)
    let datePart = dateString.split(',')[0].trim();
    if (datePart.match(/\d{1,2}\/\d{1,2}\/\d{4}/) && datePart.includes(' ')) {
        datePart = datePart.split(' ')[0];
    }
    // Try ISO or dash-separated first
    if (datePart.includes('-')) {
        const d = new Date(datePart);
        if (!isNaN(d.getTime())) return d;
    }
    // Hybrid heuristic for slash-separated
    if (datePart.includes('/')) {
        const parts = datePart.split('/').map(Number);
        if (parts.length === 3) {
            const day = parts[0], month = parts[1], year = parts[2];
            if (day > 12) {
                // Definitely dd/mm/yyyy
                return new Date(year, month - 1, day);
            } else if (month > 12) {
                // Definitely mm/dd/yyyy
                return new Date(year, day - 1, month);
            } else {
                // Both ≤ 12, default to dd/mm/yyyy (admin's intent)
                return new Date(year, month - 1, day);
            }
        }
    }
    // Fallback
    const fallback = new Date(dateString);
    return fallback;
}

const OrderTable = () => {
    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const { data, isLoading } = useGetAllOrderedQuery(undefined);
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
      if (data) setOrders(data);
    }, [data]);
    
    const [searchText, setSearchText] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

    const handleSelectOrder = (orderId: string, checked: boolean) => {
      setSelectedOrderIds(prev =>
        checked ? [...prev, orderId] : prev.filter(id => id !== orderId)
      );
    };
    
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedOrderIds(orders.map(o => o._id));
      } else {
        setSelectedOrderIds([]);
      }
    };
    
    const allSelected = orders.length > 0 && selectedOrderIds.length === orders.length;

    const handleClearFilters = () => {
        setStartDate("");
        setEndDate("");
    };

    // Filtering logic for date range
    const filterByDateRange = (order: Order) => {
        if (!startDate && !endDate) return true;
        const orderDate = parseOrderDate(order.date || "");
        if (isNaN(orderDate.getTime())) return false;
        if (startDate && !endDate) {
            // Only startDate: show orders on or after startDate
            return orderDate >= new Date(startDate);
        }
        if (!startDate && endDate) {
            // Only endDate: show orders on or before endDate (inclusive)
            const inclusiveEnd = new Date(endDate);
            inclusiveEnd.setDate(inclusiveEnd.getDate() + 1);
            return orderDate < inclusiveEnd;
        }
        if (startDate && endDate) {
            // Both set: show orders in range (inclusive)
            const inclusiveEnd = new Date(endDate);
            inclusiveEnd.setDate(inclusiveEnd.getDate() + 1);
            return orderDate >= new Date(startDate) && orderDate < inclusiveEnd;
        }
        return true;
    };

    // For display
    const renderCurrentRange = () => {
        if (!startDate && !endDate) return null;
        return (
            <div className="mb-2 text-purple-700 font-medium">
                Showing orders from {startDate || '...'} to {endDate || '...'}
            </div>
        );
    };

    // Filter the orders
    const filteredOrders = orders
        ?.filter((val: Order) => {
            if (status) {
                return val.status === status;
            } else {
                return val;
            }
        })
        ?.filter((val: Order) => {
            if (searchText === "") {
                return val;
            } else if (val?._id?.toLowerCase()?.includes(searchText.toLowerCase())) {
                return val;
            }
        })
        ?.filter(filterByDateRange);
    
    // Loading state
    if (isLoading) {
        return (
            <div className="w-full py-8">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
                </div>
                <p className="text-center mt-4 text-gray-600">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Mobile Header - Only visible on small screens */}
            <div className="block sm:hidden mb-4 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-purple-600 text-white p-4">
                    <h1 className="text-xl font-bold">Orders</h1>
                    <p className="text-sm text-purple-100 mt-1">Manage customer orders</p>
                </div>
            </div>
            
            {/* Search and Filters Section - Responsive Layout */}
            <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="relative rounded-md shadow-sm w-full sm:w-auto">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            type="text"
                            placeholder="Search by order ID..."
                            className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                        />
                    </div>
                    
                    <div className="flex gap-2 items-center">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                            onClick={() => setShowFilters((v) => !v)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                            </svg>
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                        
                        <div 
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors cursor-pointer"
                            style={{ opacity: !selectedOrderIds.length ? 0.6 : 1, pointerEvents: !selectedOrderIds.length ? 'none' : 'auto' }}
                        >
                            <BulkDownloadButton selectedOrders={selectedOrderIds} orders={orders} />
                        </div>
                    </div>
                </div>
                
                {showFilters && (
                    <div className="mt-4 border-t pt-4 border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                            <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-4">
                                <div className="w-full sm:w-auto">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                                    />
                                </div>
                                <div className="w-full sm:w-auto">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <button
                                className="px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                onClick={handleClearFilters}
                                disabled={!startDate && !endDate}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Clear Dates
                            </button>
                        </div>
                        {renderCurrentRange()}
                    </div>
                )}
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                    {filteredOrders?.length ? `Showing ${filteredOrders.length} order${filteredOrders.length !== 1 ? 's' : ''}` : 'No orders found'}
                </p>
                {filteredOrders?.length > 0 && (
                    <div className="flex items-center">
                        <label className="text-sm text-gray-600 mr-2 flex items-center">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={e => handleSelectAll(e.target.checked)}
                                className="mr-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            Select all
                        </label>
                    </div>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block w-full overflow-x-auto shadow-sm rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="relative w-12 px-3 py-3.5">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={e => handleSelectAll(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                        </th>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Advanced</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Transaction / Bkash</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order Date</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredOrders?.length > 0 ? (
                        filteredOrders.map((item: Order) => (
                            <OrderTableBody
                                key={item._id}
                                item={item}
                                onDelete={(_id: string) => setOrders((prev) => prev.filter((o) => o._id !== _id))}
                                checked={selectedOrderIds.includes(item._id)}
                                onSelect={checked => handleSelectOrder(item._id, checked)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center py-12 text-gray-500 bg-white">
                                No orders match your filters
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden space-y-4">
                {filteredOrders?.length > 0 ? (
                    filteredOrders.map((item: Order) => (
                        <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedOrderIds.includes(item._id)}
                                        onChange={e => handleSelectOrder(item._id, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <div>
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-800 mr-2">Order:</span>
                                            <Link href={`/admin/orders/${item._id}`} className="font-medium text-purple-700 hover:text-purple-800 truncate max-w-[150px]">
                                                {item._id.substring(0, 12)}...
                                            </Link>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {item.date}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                                        ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        item.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                        item.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                        item.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                        item.status === 'received' ? 'bg-purple-100 text-purple-800' :
                                        item.status === 'failed' ? 'bg-gray-100 text-gray-800' :
                                        'bg-gray-100 text-gray-800'}`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 p-4">
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500 mb-1 font-medium">Total</p>
                                    <p className="font-semibold text-base">{item.total} Tk</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500 mb-1 font-medium">Payment</p>
                                    <p className="font-semibold">{item.payment?.phone || '-'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500 mb-1 font-medium">Transaction ID</p>
                                    <p className="font-semibold truncate">{item.payment?.transId || '-'}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-xs text-gray-500 mb-1 font-medium">Customer</p>
                                    <p className="font-semibold truncate">{item?.name || '-'}</p>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                                {/* <div className="flex space-x-2">
                                    <button
                                        onClick={() => router.push(`/admin/orders/${item._id}`)}
                                        className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors"
                                        title="View Details"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </button>
                                    <button 
                                        className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors"
                                        title="Download Invoice"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                    </button>
                                </div> */}
                                
                                <OrderTableBody
                                    key={item._id}
                                    item={item}
                                    onDelete={(_id: string) => setOrders((prev) => prev.filter((o) => o._id !== _id))}
                                    checked={selectedOrderIds.includes(item._id)}
                                    onSelect={checked => handleSelectOrder(item._id, checked)}
                                    mobileView={true}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 px-4 bg-white rounded-lg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 mb-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No orders found matching your filters</p>
                        <button
                            onClick={handleClearFilters}
                            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTable;
