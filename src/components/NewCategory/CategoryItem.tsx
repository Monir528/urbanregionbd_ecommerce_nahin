"use client";
import Link from "next/link";
import { resizeName } from "@/utils/sizes";
import Image from "next/image";

const CategoryItem = ({ item }) => {
  const { description, images } = item || {};
  let { productName, price, discount } = description || {};

  const quickView=()=>{
    console.log("done");
  }

  return (
    <Link
      href={`/productDetails/${item?._id}`}
      className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <Image
        className="object-cover w-full  h-56 md:h-52 md:w-48"
        width={48}
        height={56}
        src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0]?.filename}`}
        unoptimized
        alt=""
      />
      <div className="flex flex-col justify-between p-2 leading-normal">
        <h5 className="mb-0 md:mb-2 text-lg font-semibold text-gray-900 dark:text-white font-abc ">
          {resizeName(productName, 25)}
        </h5>
        <p className="font-normal text text-gray-700 dark:text-gray-400 line-through font-blinker text-xs my-[-3px]">
          Price: {price} Taka
        </p>

        <p className="mb-1 md:mb-4 font-medium text-gray-700 dark:text-gray-400 font-blinker">
          Offer Price: {discount}
        </p>
        <button onClick={quickView} className=" bg-black text-xs py-[2px] px-2 font-semibold text-white">Save Tk: {price - discount}</button>
      </div>
    </Link>
  );
};

export default CategoryItem;
