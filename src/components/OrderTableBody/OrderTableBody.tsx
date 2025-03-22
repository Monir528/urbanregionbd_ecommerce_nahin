import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import Link from "next/link";
import { TbEyeClosed } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { useEditOrderMutation } from "@/components/api/confirmOrder/confirmOrder";
import { Order } from "@/types/order";

interface OrderTableBodyProps {
    item: Order
}

const OrderTableBody = ({ item }: OrderTableBodyProps) => {
    const { _id, total, payment, date, status } = item || {};

    const [orderStatus, setOrderStatus] = useState<string>(status);
    const [editOrder] = useEditOrderMutation();

    const handleEdit = (e: string) => {
        setOrderStatus(e);
        console.log(_id, e);
        editOrder({ id: _id, status: e });
    };

    return (
        <tr className="border-b border-gray-300">
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
                <Link href="">
                    <IoMdDownload />
                </Link>
                <Link href={`invoice/${_id}`} >
                    <TbEyeClosed />
                </Link>
                <Link href="">
                    <FaEdit />
                </Link>
            </td>
        </tr>
    );
};

export default OrderTableBody;
