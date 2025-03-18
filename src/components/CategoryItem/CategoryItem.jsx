
import Image3 from "/drop1.png";
import Image2 from "../../assets/tshirt.png";
import Image4 from "/trouser1.png";
import { Link } from "react-router-dom";

const CategoryItem = () => {
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
                <p className="text-4xl xl:text-5xl font-bold opacity-40 mb-2">
                  Trouser
                </p>
                
                <Link to="category/trouser">
                <button className="cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10 bg-white
                text-brandBlue"
                >Browse</button>
                </Link>

                
              </div>
            </div>
            <img
              src={Image4}
              alt=""
              className="w-[210px] absolute bottom-0 right-0"
            />
          </div>
          
          {/* second col */}
          <div className="py-10 pl-5 bg-gradient-to-br from-black/30 to-black/90 text-white rounded-3xl relative h-[320px] flex items-end">
            <div>
              <div className="mb-4">
                <p className="mb-[2px] text-gray-400">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  Jersey
                </p>
                <Link to="category/jersey">
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
              src={Image2}
              alt=""
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
