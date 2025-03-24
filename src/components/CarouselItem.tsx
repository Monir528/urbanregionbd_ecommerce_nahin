import { useRouter } from "next/navigation";
import { resizeName } from "@/utils/sizes";
// import {ContentState} from "draft-js";
import Image from 'next/image';

import { Product } from "@/types/product";

interface CarouselItemProps {
  data: Product;
}

const CarouselItem = ({ data }: CarouselItemProps) => {
  const { description, images, _id } = data || {};
  const { productName, price, discount } = description || {};

  const router = useRouter();

  const handleDescription = (id: string) => {
    router.push(`/productDetails/${id}`);
  };

  // console.log('review ', review);
  return (
      <div
          onClick={() => handleDescription(_id)}
          className="group w-full h-full  bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <Image
              fill
              unoptimized
              src={images?.[0]?.filename ?
                  `${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[0]?.filename}` :
                  '/fallback-image.jpg'}
              alt={productName || "Product Image"}
              className="object-cover object-center"
          />
        </div>
        <div className="text-center text-black">
          <h3 className="text-sm font-medium mb-1">
            {resizeName(productName, 15)?.toUpperCase()}
          </h3>
          <div className="flex justify-center items-center gap-2">
            <p className="text-lg font-bold text-primary">৳ {price}</p>
            {discount && (
                <p className="text-sm text-gray-400 line-through">৳ {discount}</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default CarouselItem;