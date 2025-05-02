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
    console.log("query status", status);
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
            <div className="mb-2 text-purple-700">
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

    return (
        <div className="mt-[30px] mx-[20px] sm:mt-[20px] sm:mx-0 font-abc text-sm">
            {/* Search and Filters Section - Responsive Layout */}
            <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2 mb-2 sm:mb-0">
                    <h2 className="whitespace-nowrap">Search By Order ID:</h2>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        type="text"
                        className="p-1 w-full text-sm border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        className="px-3 py-1 bg-purple-200 rounded hover:bg-purple-300 transition whitespace-nowrap"
                        onClick={() => setShowFilters((v) => !v)}
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                    </button>
                    <span className="">
                        <BulkDownloadButton selectedOrders={selectedOrderIds} orders={orders} />
                    </span>
                </div>
            </div>

            {/* Date Filter Controls - Responsive Layout */}
            {showFilters && (
                <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center mb-4">
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-2 sm:mb-0 w-full">
                        <label className="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span className="whitespace-nowrap">Start Date:</span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="p-1 text-sm border border-gray-300 rounded-md w-full"
                            />
                        </label>
                        <label className="flex flex-col sm:flex-row sm:items-center gap-1">
                            <span className="whitespace-nowrap">End Date:</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="p-1 text-sm border border-gray-300 rounded-md w-full"
                            />
                        </label>
                    </div>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        onClick={handleClearFilters}
                        disabled={!startDate && !endDate}
                    >
                        Clear
                    </button>
                </div>
            )}
            {renderCurrentRange()}

            {/* Table Header - Hidden on Mobile */}
            <div className="hidden sm:block w-full overflow-x-auto pb-2">
                <table className="border-collapse border border-gray-300 w-full">
                    <thead>
                    <tr>
                        <th className="border border-b-2 border-gray-300 p-3 text-center bg-white text-black align-middle">
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={e => handleSelectAll(e.target.checked)}
                            />
                        </th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Order ID</th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Total</th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Advanced</th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Transaction / Bkash</th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Order Date</th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Status</th>
                        <th className="border border-b-2 border-gray-300 p-2 text-left bg-white text-black">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!isLoading &&
                        filteredOrders?.map((item: Order) => (
                            <OrderTableBody
                                key={item._id}
                                item={item}
                                onDelete={(_id: string) => setOrders((prev) => prev.filter((o) => o._id !== _id))}
                                checked={selectedOrderIds.includes(item._id)}
                                onSelect={checked => handleSelectOrder(item._id, checked)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="block sm:hidden">
                {!isLoading && filteredOrders?.map((item: Order) => (
                    <div key={item._id} className="border border-gray-300 rounded-lg mb-4 p-3 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedOrderIds.includes(item._id)}
                                    onChange={e => handleSelectOrder(item._id, e.target.checked)}
                                    className="mr-2"
                                />
                                <Link href={`/admin/orders/${item._id}`} className="font-medium text-purple-500">
                                    Order ID: {item._id}
                                </Link>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                item.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                item.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                                item.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                item.status === 'received' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'}`}>
                                {item.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                            <div><span className="font-medium">Total:</span> {item.total}</div>
                            <div><span className="font-medium">Payment:</span> {item.payment?.phone}</div>
                            <div><span className="font-medium">Transaction:</span> {item.payment?.transId}</div>
                            <div><span className="font-medium">Date:</span> {item.date}</div>
                        </div>
                        <div className="flex justify-end mt-2">
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
                ))}
                {filteredOrders?.length === 0 && (
                    <div className="text-center py-4 text-gray-500">No orders found</div>
                )}
            </div>
        </div>
    );
};

export default OrderTable;
