import Image from "next/image";
import { Order } from "@/types/order";

interface InvoiceHeaderProps {
  details: Order
}
const InvoiceHeader = ({ details }: InvoiceHeaderProps) => {
  return (
      <div className="w-[500px] mx-auto shadow-lg p-4 font-rajdhani text-[16px] font-normal">
        {/* Invoice Top Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-blueviolet text-[16px]">Urban Region BD</h1>
            <p className="text-gray-700">Invoice Id: {details?._id}</p>
            <p className="text-gray-700">Date: {details?.date}</p>
          </div>
          <div className="bg-black text-white px-8 py-2 rounded-md">
            <h1 className="text-[16px] font-normal">Invoice</h1>
          </div>
        </div>

        <hr className="border-gray-300 mb-4" />

        {/* Billing Information */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-normal">BILL FROM: Urban Region BD</p>
              <p>Phone: 01858-124027</p>
              <p>Address: Mirpur-11, Dhaka-1216</p>
            </div>
            <Image
            width={16}
            height={16}
            unoptimized
                className="h-16"
                src="https://i.ibb.co/7GVcKqq/347120619-205072055716972-7844522544708747971-n.jpg"
                alt="Company Logo"
            />
          </div>

          <hr className="border-gray-300 my-4" />

          <div>
            <p className="font-normal">
              BILL TO: {details.name}
            </p>
            <p>Phone: {details.phone}</p>
            <p>Address: {details.address}</p>
            {/* <p>Zip Code: {details.zip}</p> */}
            <p>Email: {details.email}</p>
          </div>
        </div>
      </div>
  );
};

export default InvoiceHeader;
