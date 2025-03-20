import InvoiceItem from "./InvoiceItem";

const InvoiceDetails = ({ details }) => {
  return (
      <div className="mx-[10px]">
        <table className="w-full border-collapse">
          <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left text-[16px] text-black bg-[#F2F2F2]">
              Item
            </th>
            <th className="border border-gray-300 p-2 text-left text-[16px] text-black bg-[#F2F2F2]">
              Size
            </th>
            <th className="border border-gray-300 p-2 text-left text-[16px] text-black bg-[#F2F2F2]">
              Quantity
            </th>
            <th className="border border-gray-300 p-2 text-left text-[16px] text-black bg-[#F2F2F2]">
              Rate
            </th>
            <th className="border border-gray-300 p-2 text-left text-[16px] text-black bg-[#F2F2F2]">
              Tax
            </th>
          </tr>
          </thead>
          <tbody className="text-[16px] text-black bg-[#F2F2F2]">
          {details?.orderedItem?.map((item) => (
              <InvoiceItem key={item.id} item={item} />
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default InvoiceDetails;
