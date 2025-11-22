import Image1 from "../../assets/cargo.png";
import Image2 from "/tshirt.png";

import Image4 from "/hoodie1.png";
import {Link } from "react-router-dom";

const CategoryItem2 = () => {

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First col */}
          <div className="sm:col-span-2 py-10 pl-5 bg-gradient-to-br from-gray-400/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Cargo Pants
                </p>
                <Link to="category/cargo pants">
                <button className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-primary
                text-white"
                  
                >Browse</button></Link>
               
              </div>
            </div>
            <img
              src={Image1}
              alt=""
              className="w-[144px] mr-12 absolute top-1/2 -translate-y-1/2 -right-0"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg'; // set fallback image with default
              }}
            />
          </div>
          {/* Second col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-black/90 to-gray/40 text-white rounded-3xl relative h-[320px] flex items-start">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  T-Shirt
                </p>
                <Link to="category/t-shirt">
                <button className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-white
                text-brandGreen"
                >Browse</button></Link>
              </div>
            </div>
            <img src={Image2} alt="" className="w-[320px] absolute bottom-0 ml-12" 
            onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg'; // set fallback image with default
              }}
            />
          </div>
          {/* Third col */}
          

          <div className="py-10 pl-5 bg-gradient-to-br from-black/90 to-black/30 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Hoodie
                </p>
                <Link to="category/hoodie">
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
              src={Image4}
              alt=""
              className="w-[210px] absolute bottom-0 right-[0rem]"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg'; // set fallback image with default
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem2;
