"use client";
import Link from "next/link";
import { resizeName } from "@/utils/sizes";
import Image from "next/image";
import { Product } from "@/types/product";

interface CategoryItemProps {
  item: Product
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  const { description, images } = item || {};
  const { productName, price, discount } = description || {};

  const quickView=()=>{
    console.log("done");
  }

  return (
    <Link
      href={`/productDetails/${item?._id}`}
      className="flex flex-col items-center bg-white border border-gray-200 shadow md:flex-row md:max-w-xl hover:bg-gray-100  "
    >
      <Image
        className="object-cover w-full  h-56 md:h-52 md:w-48"
        width={48}
        height={56}
        src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0]?.filename}`}
        unoptimized
        alt=""
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null; // prevent infinite loop
          target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg'; // set fallback image with default
        }}
      />
      <div className="flex flex-col justify-between p-2 leading-normal">
        <h5 className="mb-0 md:mb-2 text-lg font-semibold text-gray-900  font-abc ">
          {resizeName(productName, 25)}
        </h5>
        <p className="font-normal text text-gray-700  line-through font-blinker text-xs my-[-3px]">
          Price: {price} Taka
        </p>

        <p className="mb-1 md:mb-4 font-medium text-gray-700 font-blinker">
          Offer Price: {discount} Taka
        </p>
        <button onClick={quickView} className=" bg-black text-xs py-[2px] px-2 font-semibold text-white">Save Tk: {parseFloat(price) - parseFloat(discount)}</button>
      </div>
    </Link>
  );
};

export default CategoryItem;
