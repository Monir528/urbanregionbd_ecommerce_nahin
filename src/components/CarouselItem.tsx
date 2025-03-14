/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRouter } from "next/navigation";
import { resizeName } from "@/utils/sizes";
import {ContentState} from "draft-js";

const CarouselItem = ({ data }) => {
  const { description, images, _id } = data || {};
  const { productName, price, discount, review } = description || {};

  const router = useRouter();

  const handleDescription = (id) => {
    router.push(`/productDetails/${id}`);
  };


  console.log('CarouselItem ', images);
  return (
      <div
          onClick={() => handleDescription(_id)}
          className="w-full max-w-sm p-2 text-black bg-white dark:border-gray-700 cursor-pointer"
      >
        <img
            src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0]?.filename}`}
            // src={images?.[0] || "/placeholder-image.jpg"}
            alt={productName || "Product Image"}
            className="w-full max-w-sm p-2 bg-white dark:bg-gray-800 dark:border-gray-700"
        />
        <div>
          <h3>{resizeName(productName, 15)?.toUpperCase()}</h3>
          <p>৳ {price}</p>
          {discount && <p className="line-through">৳ {discount}</p>}
        </div>
      </div>
  );
};

export default CarouselItem;