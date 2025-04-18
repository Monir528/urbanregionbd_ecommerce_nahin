import { useState } from "react";
import { TbEyeClosed } from "react-icons/tb";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEditOrderMutation } from "@/components/api/confirmOrder/confirmOrder";
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

    const [orderStatus, setOrderStatus] = useState<string>(status);
    const [editOrder] = useEditOrderMutation();

    const handleEdit = (e: string) => {
        setOrderStatus(e);
        console.log(_id, e);
        editOrder({ id: _id, status: e });
    };

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
        <tr className="border-b border-gray-300">
            <td>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={e => onSelect && onSelect(e.target.checked)}
                />
            </td>
            <td>
                <Link target="_blank" href={`/admin/orders/${_id}`} className="text-purple-500">
                    {_id}
                </Link>
            </td>
            <th>{total}</th>
            <td>Gap</td>
            <td>
                <p>{payment?.phone}</p>
                <p>{payment?.transId}</p>
            </td>
            <td>{date}</td>
            <td>
                <select
                    name="category"
                    required
                    id=""
                    className={`border-none font-bold px-2 py-1 rounded-md 
            ${
                        orderStatus === "pending"
                            ? "bg-orange-500 text-white"
                            : orderStatus === "failed"
                                ? "bg-red-500 text-white"
                                : orderStatus === "delivered"
                                    ? "bg-green-500 text-white"
                                    : "bg-blue-500 text-white"
                    }`}
                    value={orderStatus}
                    onChange={(e) => handleEdit(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="delivered">Delivered</option>
                    <option value="received">Received</option>
                </select>
            </td>

            <td className="flex gap-1 justify-evenly text-purple-500">
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
