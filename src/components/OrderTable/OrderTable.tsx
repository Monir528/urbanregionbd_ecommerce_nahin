/* eslint-disable no-unused-vars */
import "./OrderTable.scss";
import OrderTableBody from "../OrderTableBody/OrderTableBody";
import { useGetAllOrderedQuery } from "@/components/api/confirmOrder/confirmOrder";
import { useState } from "react";

const OrderTable = () => {
  const { data, isLoading, isError } = useGetAllOrderedQuery();
  const [searchText, setSearchText] = useState("");

  return (
    <div className="orderTable font-abc text-sm">
      <div className="flex gap-4 items-center mb-4">
        <h2>Search By Order ID:</h2>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          className="p-0 text-sm"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Advanced</th>
            <th>Transaction / Bkash</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            data?.length > 0 &&
            data
            ?.filter(val=>{
              if(searchText==""){
                return val
              }else if(val?._id?.toLowerCase()?.includes(searchText.toLocaleLowerCase())){
                return val
              }
            })
            ?.map((item) => (<OrderTableBody key={item._id} item={item}></OrderTableBody>))
            }
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
