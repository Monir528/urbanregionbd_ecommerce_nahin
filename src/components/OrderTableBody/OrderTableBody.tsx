/* eslint-disable react/prop-types */
import  { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import Link from "next/link";
import { TbEyeClosed } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import "./OrderTableBody.scss"
import { useEditOrderMutation } from "@/components/api/confirmOrder/confirmOrder";

const OrderTableBody = ({item}) => {
  const {_id,total, payment, date, status }= item || {}


  const [orderStatus, setOrderStatus]=useState(status)
  
  const [editOrder]=useEditOrderMutation()

  const handleEdit=(e)=>{
    setOrderStatus(e)
    console.log(_id, e);
    editOrder({id:_id,status:e})
  }
  
  return (
      <tr className="orderTableBody container">
        <td><Link target="_blank" href={`${_id}`}>{_id}</Link></td>
        <th>{total}</th>
        <td>Gap</td>
        <td><p>{payment?.phone}</p> <p>{payment?.transId}</p> </td>
        <td>{date}</td>
        <td>
        <select
            name="category"
            required
            id=""
            className={`${orderStatus}`}
            value={orderStatus}
            onChange={(e) => handleEdit(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="delivered">Delivered</option>
            <option value="received">Received</option>
          </select>
        </td>
        
        <td className="productAction">
          <div className="content">
          <Link href=""><IoMdDownload></IoMdDownload></Link>
          <Link href={`invoice/${_id}`} state={item}><TbEyeClosed></TbEyeClosed></Link>
          <Link href=""><FaEdit></FaEdit></Link>
          </div>
        </td>
      </tr>
  );
};

export default OrderTableBody;
