/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Link from "next/link";
import Button from "../Shared/Button";
import { resizeName } from "@/utils/sizes";
import Image from "next/image";
// eslint-disable-next-line react/prop-types

const ProductCard = ({ data, index }) => {
  const { description, images } = data || {};
  const { productName, price, discount } = description || {};

  return (
      <div
        data-aos="fade-up"
        data-aos-delay={index * 50}
        className="group"
        key={data._id}
      >
        <div className="relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0].filename}`}
            width={231}
            height={180}
            alt=""
            className="h-[180px] w-[260px] object-cover rounded-md"
          />
          {/* hover button */}
          <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full font-mont font-semibold w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md">
            <Link href={`/productDetails/${data?._id}`}>
              <Button
                
                text={"View Details"}
                bgColor={"bg-brandBlue"}
                textColor={"text-white"}
              />
            </Link>
          </div>
        </div>
        <div className="leading-7">
          <h2 className="font-semibold">{resizeName(productName,17)}</h2>
          <h2 className="font-semi-bold line-through text-red-500">${price}</h2>
          <h2 className="font-bold">${discount}</h2>
        </div>
      </div>
  );
};

export default ProductCard;
