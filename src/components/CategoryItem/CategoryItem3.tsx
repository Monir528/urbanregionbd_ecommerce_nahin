
import Image from "next/image"
import Link from "next/link";

const CategoryItem3 = () => {
  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* first col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-black/50 to-white/40 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-2xl xl:text-3xl font-bold opacity-80 mb-2">
                  Formal Pant
                </p>
                
                <Link href="category/formal pant">
                <button className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-red-600 text-white">Browse</button>
                </Link>

                
              </div>
            </div>
            <Image
              src={"/assets/formalpants.png"}
              width={246}
              height={320}
              alt=""
              className="w-[246px] absolute bottom-0 right-[-5%]"
            />
          </div>
          
          {/* second col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-black/30 to-black/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Polo Shirt
                </p>
                <Link href="category/polo shirt">
                  <button
                    className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-red-600 text-white"
                  >
                    Browse
                  </button>
                </Link>
              </div>
            </div>
            <Image
              src={"/assets/polo-shirt.png"}
              alt=""
              width={320}
              height={44}
              className="w-[320px] absolute bottom-0 right-[-3rem]"
            />
          </div>
          {/* third col */}
           <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-black/90 to-blue-400/20 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Drop <br /> Shoulder
                </p>
                <Link href="category/drop shoulder">
                  <button
                    className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10  bg-red-600 text-white">
                    Browse
                  </button>
                </Link>
              </div>
            </div>
            <picture>
              <img
                  src={"/assets/truetle_neck.png"}
                  alt=""
                  className="w-[290px] absolute top-1/2 -translate-y-1/2 right-[-1rem]"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem3;
