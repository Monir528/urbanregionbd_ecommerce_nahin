import { BannerDataType } from "@/types/bannerData";
import Image from "next/image";


interface BannerTypeDef {
  data: BannerDataType
}

const Banner = ({ data }: BannerTypeDef) => {
  return (
    <div className="min-h-[450px] flex justify-center items-center py-12">
      <div className="container">
        <div
          style={{ backgroundColor: data.bgColor }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
        >
          {/* first col */}
          <div className="p-6 sm:p-8">
            <p data-aos="slide-right" className="text-sm">
              {data.discount}
            </p>
            <h1
              data-aos="zoom-out"
              className="uppercase text-4xl lg:text-6xl font-bold"
            >
              {" "}
              {data.title}
            </h1>
            <p data-aos="fade-up" className="text-sm">
              {data.date}
            </p>
          </div>
          {/* second col */}
          <div data-aos="zoom-in" className="h-full flex items-center">
            <Image
              src={data.image}
              unoptimized={true}
              alt=""
              className="scale-155 w-[250px] md:w-[280px] mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover"
            />
          </div>
          {/* third col */}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <p data-aos="zoom-out" className="font-bold text-xl">
              {data.title2}
            </p>
            <p data-aos="fade-up" className=" text-3xl sm:text-5xl font-bold">
              {data.title3}
            </p>
            <p data-aos="fade-up" className="text-sm tracking-wide leading-5">
              {data.title4}
            </p>
            <div data-aos="fade-up" data-aos-offset="0">
              <button
                style={{ color: data.bgColor }}
                className="bg-white py-2 px-4 rounded-full"
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={data.href}
                >অর্ডার করুন</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
