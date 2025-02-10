/* eslint-disable react/prop-types */

import { useState } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import "./DetailsImage.scss"
/* eslint-disable no-unused-vars */
const DetailsImage = ({ images }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className=" w-full sm:w-auto md:w-8/12 pt-0 lg:pt-12 lg:w-6/12 flex flex-col gap-4">
      {/* main images  */}
      <div className=" lg:w-10/12 bg-gray-100 flex justify-center items-center">
        <div className="main-image">
          <SideBySideMagnifier
            alwaysInPlace={true}
            imageSrc={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${
              images[selected]?.filename
            }`}
            imageAlt="Example"
          />
        </div>

      </div>
      {/* // optional images  */}
      <div className=" w-full lg:w-2/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-gray-100 flex justify-center items-center py-2"
            onClick={() => setSelected(index)}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${
                images[index].filename
              }`}
              alt="Wooden chair- preview 3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsImage;
