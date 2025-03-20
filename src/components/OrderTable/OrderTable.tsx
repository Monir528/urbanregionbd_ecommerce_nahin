import OrderTableBody from "../OrderTableBody/OrderTableBody";
import { useGetAllOrderedQuery } from "@/components/api/confirmOrder/confirmOrder";
import { useState } from "react";

const OrderTable = () => {
  const { data, isLoading } = useGetAllOrderedQuery();
  const [searchText, setSearchText] = useState("");

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
        </div>
        <table className="border-collapse border border-gray-300 w-full">
          <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Order ID</th>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Total</th>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Advanced</th>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Transaction / Bkash</th>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Order Date</th>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Status</th>
            <th className="border border-gray-300 p-2 text-left bg-purple-300/20">Action</th>
          </tr>
          </thead>
          <tbody>
          {!isLoading &&
              data?.length > 0 &&
              data
                  ?.filter((val) => {
                    if (searchText === "") {
                      return val;
                    } else if (val?._id?.toLowerCase()?.includes(searchText.toLowerCase())) {
                      return val;
                    }
                  })
                  ?.map((item) => <OrderTableBody key={item._id} item={item} />)}
          </tbody>
        </table>
      </div>
  );
};

export default OrderTable;
