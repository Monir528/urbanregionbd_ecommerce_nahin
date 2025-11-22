import { FaEdit, FaTrash } from "react-icons/fa";
import { Order } from "@/types/order";
import DownloadInvoice from './DownloadInvoice';
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocalTime from "../Shared/LocalTime";

export interface OrderTableBodyProps {
    item: Order
    onDelete?: (_id: string) => void
    checked?: boolean
    onSelect?: (checked: boolean) => void
    mobileView?: boolean
}

const OrderTableBody = ({ item, onDelete, checked = false, onSelect, mobileView = false }: OrderTableBodyProps) => {
    const { _id, total, payment, date, status } = item || {};

    const router = useRouter();
    // Removed unused setOrderStatus and editOrder
    const orderStatus = status;

    const handleDeleteOrder = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/deleteOrder/${orderId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                alert("Order deleted successfully!");
                if (onDelete) onDelete(orderId);
            } else {
                alert(data.message || "Failed to delete order.");
            }
        } catch {
            alert("Error deleting order.");
        }
    };

    // Render only action buttons for mobile view
    if (mobileView) {
        return (
            <div className="flex gap-2 items-center">
                <DownloadInvoice order={item} />
                {/* <Link href={`invoice/${_id}`} className="text-purple-500 p-2">
                    <TbEyeClosed />
                </Link> */}
                <button
                    onClick={() => router.push(`/admin/orders/${_id}`)}
                    className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors"
                    title="View Details"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                <Link href="" className="text-purple-500 p-2">
                    <FaEdit />
                </Link>
                <button 
                    onClick={() => handleDeleteOrder(item._id)} 
                    title="Delete Order" 
                    className="text-purple-500 p-2"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <FaTrash />
                </button>
            </div>
        );
    }

    return (
        <tr>
            <td className="p-3 text-center align-middle border-r border-gray-300">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={e => onSelect && onSelect(e.target.checked)}
                />
            </td>
            <td className="p-3 pl-5 text-black bg-white border-r border-gray-300 align-middle">
                <Link target="_blank" href={`/admin/orders/${_id}`} className="text-purple-500">
                    {_id}
                </Link>
            </td>
            <th className="p-3 text-black bg-white border-r border-gray-300 align-middle">{total}</th>
            <td className="p-3 text-black bg-white border-r border-gray-300 align-middle">Gap</td>
            <td className="p-3 text-black bg-white border-r border-gray-300 align-middle">
                <p>{payment?.phone}</p>
                <p>{payment?.transId}</p>
            </td>
            <td className="p-3 text-black bg-white border-r border-gray-300 align-middle">
                {date ? (
                    (() => {
                        try {
                            const dateObj = new Date(date);
                            if (isNaN(dateObj.getTime())) {
                                return ''; // Invalid date
                            }
                            return <LocalTime utcDate={dateObj.toISOString()} dateStyle="medium" timeStyle="medium" />;
                        } catch {
                            return ''; // Error creating date
                        }
                    })()
                ) : ''}
            </td>
            <td className="p-3 text-black bg-white border-r border-gray-300 align-middle">
                <span
                    className={`font-bold px-2 py-1 rounded-md 
                        ${orderStatus === "pending"
                            ? "bg-orange-500 text-white"
                            : orderStatus === "failed" || orderStatus === "cancelled"
                                ? "bg-red-500 text-white"
                                : orderStatus === "delivered"
                                    ? "bg-green-500 text-white"
                                    : orderStatus === "received"
                                        ? "bg-blue-700 text-white"
                                        : "bg-blue-500 text-white"}
                    `}
                >
                    {orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)}
                </span>
            </td>

            <td className="flex gap-1 justify-evenly text-purple-500 align-middle">
                <DownloadInvoice order={item} />
                {/* <Link className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors" href={`invoice/${_id}`} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Link> */}
                <button
                    onClick={() => router.push(`/admin/orders/${_id}`)}
                    className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors"
                    title="View Details"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                {/* <Link  href="">
                    <FaEdit />
                </Link> */}
                <button
                    className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors"
                    onClick={() => handleDeleteOrder(item._id)} 
                    title="Delete Order" 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                  <FaTrash />
                </button>
            </td>
        </tr>
    );
};

export default OrderTableBody;
