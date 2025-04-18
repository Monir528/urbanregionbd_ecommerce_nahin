import OrderTableBody from "../OrderTableBody/OrderTableBody";
import BulkDownloadButton from '../OrderTableBody/BulkDownloadButton';
import { useGetAllOrderedQuery } from "@/components/api/confirmOrder/confirmOrder";
import { useState, useEffect } from "react";
import {Order} from "@/types/order";
import {useSearchParams} from "next/navigation";

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

    return (
        <div className="mt-[30px] mx-[20px] sm:mt-[20px] sm:mx-0 font-abc text-sm">
            <div className="flex gap-4 items-center mb-4">
                <h2>Search By Order ID:</h2>
                <input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    type="text"
                    className="p-0 text-sm border border-gray-300 rounded-md"
                />
                <button
                    className="ml-4 px-3 py-1 bg-purple-200 rounded hover:bg-purple-300 transition"
                    onClick={() => setShowFilters((v) => !v)}
                >
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
                <span className="ml-2">
                  <BulkDownloadButton selectedOrders={selectedOrderIds} orders={orders} />
                </span>
            </div>
            {showFilters && (
                <div className="flex gap-4 items-center mb-4">
                    <label>
                        Start Date:
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="ml-1 p-0 text-sm border border-gray-300 rounded-md"
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="ml-1 p-0 text-sm border border-gray-300 rounded-md"
                        />
                    </label>
                    <button
                        className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                        onClick={handleClearFilters}
                        disabled={!startDate && !endDate}
                    >
                        Clear
                    </button>
                </div>
            )}
            {renderCurrentRange()}
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
                  orders.length > 0 &&
                  orders
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
                    ?.filter(filterByDateRange)
                    ?.map((item: Order) => (
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
    );
};

export default OrderTable;
