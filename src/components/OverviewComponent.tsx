/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { IoMdAlarm } from "react-icons/io";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { TbDevicesCancel } from "react-icons/tb";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import Link from "next/link"

const OverviewComponent = ({ received, pending, failed, delivered }) => {

    let deliveredTotal=0
    let deliveredQuantity=0

    let failedTotal=0
    let failedQuantity=0

    let receivedTotal=0
    let receivedQuantity=0

  for(let i=0; i<delivered.length; i++){
    // console.log(delivered[i]);
    deliveredTotal += delivered[i].total
    for(let j=0; j<delivered[i].orderedItem.length; j++){
        deliveredQuantity+=delivered[i].orderedItem[j].cartQuantity
    }
  }

  for(let i=0; i<failed.length; i++){
    // console.log(failed[i]);
    failedTotal += failed[i].total
    for(let j=0; j<failed[i].orderedItem.length; j++){
        failedQuantity+=failed[i].orderedItem[j].cartQuantity
    }
  }

  for(let i=0; i<received.length; i++){
    // console.log(received[i]);
    receivedTotal += received[i].total
    for(let j=0; j<received[i].orderedItem.length; j++){
        receivedQuantity+=received[i].orderedItem[j].cartQuantity
    }
  }


  return (
    <div  className="w-full mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-white">
        {/* // first column  */}
        <div className="rounded-md py-8 p-3 bg-gradient-to-r from-cyan-500 to-blue-500">
            <div className="flex flex-col gap-1">
                <p className="text-2xl">Order Success</p>
                <p className="text-lg font-mont ">Total Percel : {delivered?.length} </p>
                <p className="text-base opacity-60 font-mont">Total Product : {deliveredQuantity} </p>
                <p className="text-xl font-abc">Total  : {deliveredTotal} Taka</p>
            <HiArrowTrendingUp className="font-bold text-6xl opacity-40 "></HiArrowTrendingUp>
            </div>
        </div>
        <div className="rounded-md py-8 p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <p className="text-2xl">Order Pending</p>
                <p className="text-lg font-mont ">Total Percel : {pending?.length} </p>
                <IoMdAlarm className="font-bold text-6xl opacity-40 "></IoMdAlarm>
            </div>
        <div className="rounded-md py-8 p-3 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% sm:col-span-2"><div>
            Total
            <p className="opacity-80">Total Order :  
            { received?.length+ pending?.length+ failed?.length+ delivered?.length}
            </p>
        <FaRegMoneyBill1 className="font-bold text-6xl opacity-40 "></FaRegMoneyBill1></div></div>
        <div className="rounded-md p-3 py-8 bg-gradient-to-r from-red-500 from-10%  to-yellow-500 to-90%">
      
            <div className="flex flex-col gap-1">
                <p className="text-2xl">Order Failed</p>
                <p className="text-lg font-mont ">Total Percel : {failed?.length} </p>
                <p className="text-base opacity-60 font-mont">Total Product : {failedQuantity} </p>
                <p className="text-xl font-abc">Total  : {failedTotal} Taka</p>
                <HiArrowTrendingDown className="font-bold text-6xl opacity-40 "></HiArrowTrendingDown>
            </div>
            
        
        </div>
        <div className="rounded-md p-3 py-8 bg-gradient-to-r from-pink-500 from-10%  to-purple-300 to-90%">
            
            <div className="flex flex-col gap-1">
                <p className="text-2xl">Order Received</p>
                <p className="text-lg font-mont ">Total Percel : {received?.length} </p>
                <p className="text-base opacity-60 font-mont">Total Product : {receivedQuantity} </p>
                <p className="text-xl font-abc">Total  : {receivedTotal} Taka</p>
            <TbDevicesCancel className="font-bold text-6xl opacity-40 "></TbDevicesCancel>
            </div>
        </div>
        <div className="rounded-md p-3 py-8 bg-gradient-to-r from-purple-500 from-10%  to-blue-300 to-90%">
            <div>
                <p>Total Products</p>
                <Link href="/dashboard/allProducts" className=" text-base underline font-base">Click here</Link>
            <RiShoppingCart2Fill className="font-bold text-6xl opacity-40 "></RiShoppingCart2Fill>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewComponent;
