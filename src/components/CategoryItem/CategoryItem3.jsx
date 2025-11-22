

import Image5 from "../../assets/formalpants.png"
import Image6 from "../../assets/polo-shirt.png"
import { Link } from "react-router-dom";

const CategoryItem3 = () => {
  return (
    <div className="py-8">
      <div className="container">
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
                
                <Link to="category/formal pant">
                <button className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-white
                text-brandBlue"
                >Browse</button>
                </Link>

                
              </div>
            </div>
            <img
              src={Image5}
              alt=""
              className="w-[246px] absolute bottom-0 right-[-5%]"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg'; // set fallback image with default
              }}
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
                <Link to="category/polo shirt">
                  <button
                    className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-primary
                text-white"
                  >
                    Browse
                  </button>
                </Link>
              </div>
            </div>
            <img
              src={Image6}
              alt=""
              className="w-[320px] absolute bottom-0 right-[-3rem]"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg'; // set fallback image with default
              }}
            />
          </div>
          {/* third col */}
          {/* <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-black/90 to-blue-400/20 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Drop <br /> Shoulder
                </p>
                <Link to="category/drop shoulder">
                  <button
                    className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10  bg-white
                text-primary"
                  >
                    Browse
                  </button>
                </Link>
              </div>
            </div>
            <img
              src={Image3}
              alt=""
              className="w-[290px] absolute top-1/2 -translate-y-1/2 right-[-1rem]"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryItem3;
