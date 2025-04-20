import { TbEyeClosed } from "react-icons/tb";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Order } from "@/types/order";
import DownloadInvoice from './DownloadInvoice';
import Link from "next/link";

interface OrderTableBodyProps {
    item: Order
    onDelete?: (_id: string) => void
    checked?: boolean
    onSelect?: (checked: boolean) => void
}

const OrderTableBody = ({ item, onDelete, checked = false, onSelect }: OrderTableBodyProps) => {
    const { _id, total, payment, date, status } = item || {};

    // Removed unused setOrderStatus and editOrder
    const orderStatus = status;

    const handleDeleteOrder = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/deleteOrder/${orderId}`, {
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
            <td className="p-3 text-black bg-white border-r border-gray-300 align-middle">{date}</td>
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
                <Link href={`invoice/${_id}`} >
                    <TbEyeClosed />
                </Link>
                <Link href="">
                    <FaEdit />
                </Link>
                <button onClick={() => handleDeleteOrder(item._id)} title="Delete Order" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                  <FaTrash />
                </button>
            </td>
        </tr>
    );
};

export default OrderTableBody;
