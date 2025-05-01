'use client';

import { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { makeSizes } from "@/utils/sizes";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "next/navigation";
// import { orderFormOpen } from "@/components/api/cartHandler";
import { addToCart, decreaseCart, getTotals } from "@/components/api/cartSlice";
import { PiToiletPaperLight } from "react-icons/pi";
import Link from "next/link";
import SizeModal from "@/components/SizeModal";
import { sizeModalOpen } from "@/components/api/sizeModalSlice";
import { IoCartSharp } from "react-icons/io5";
import {RootState} from "@/reduxToolKit/store";
import {ProductImage, ProductDescription} from "@/types/product";

interface DetailsContentTypeDef {
    desc: ProductDescription;
    img: ProductImage[];
}

const DetailsContent = ({ desc, img } : DetailsContentTypeDef) => {
  // const [rotate, setRotate] = useState(false);
  const [count, setCount] = useState(0);
  const [selectSize, setSelectSize] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [warning, setWarning] = useState(false);
  // const [amountWarning, setAmountWarning] = useState(false);
  const { id } = useParams();
  // const navigate = useRouter();

  const {
    // brand,
    
    category,
    // description,
    shortDescription,
    discount,
    extra,
    extraInfo,
    price,
    productName,
    review,
    stock,
    otherLink,
  } = desc || {};

  const sizes = makeSizes(extra) || [];

  // make a single number to array for rating
  const newArr = [];
  if (review) {
    for (let el = 0; el < Number(review); el++) {
      newArr.push(el);
    }
  }

  const dispatch = useDispatch();

  const addCount = () => {
    if (!selectSize) {
      setWarning(true);
    } else {
      setCount((prev) => prev + 1);
      setWarning(false);
      dispatch(
        addToCart({
          id: `${id}>>>${selectSize}`,

          name: desc?.productName,
          image: `${process.env.NEXT_PUBLIC_ROOT_API}/Images/${img[0]?.filename}`,
          price: desc?.discount,
          cartQuantity: count,
        })
      );
    }
  };

  const cart = useSelector((state: RootState) => state.cart);
  
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const paymentCost = useSelector((state: RootState) => state.cart);


  const minusCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      dispatch(
        decreaseCart({
          id: `${id}>>>${selectSize}`,
          name: desc.productName,
          image: `${process.env.NEXT_PUBLIC_ROOT_API}/Images/${img[0]?.filename}`,
          price: desc.discount,
          cartQuantity: count,
        })
      );
    }
  };

  const handleSize = (value: string, index: number) => {
    setSelectSize(value);
    setSelectedIndex(index);
  };

  // const handlePurchase = () => {
  //   if (selectSize === null || count === 0) {
  //     setWarning(true);
  //     setCount(1)
  //   } else {
  //     setWarning(false);
  //     // dispatch(orderFormOpen());
  //     navigate.push("/shoppingCart");
  //   }
  // };

  const { isOpen } = useSelector((state: RootState) => state.size);

  function openModal() {
    dispatch(sizeModalOpen(`${process.env.NEXT_PUBLIC_ROOT_API}${otherLink}`));
  }

  return (
    <div className="  w-full sm:w-auto md:w-8/12 lg:w-6/12 items-center text-black">
      {isOpen && <SizeModal />}
      <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 font-abc  dark:text-gray-400">
        {category?.toUpperCase()}
      </p>
      <h2 className="font-semibold lg:text-3xl text-2xl lg:leading-9 leading-7 text-gray-800 mt-4">
        {productName?.toUpperCase()}
      </h2>

      {/* // total start  */}
      <div className=" flex flex-row justify-between  mt-5">
        <div className=" flex flex-row space-x-3 text-xl">
          {newArr.map((val) => (
            <MdOutlineStar className="mr-[-14px]" key={val} />
          ))}
        </div>
        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 font-abc cursor-pointer">
          22 reviews
        </p>
      </div>
      {/* price  */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 ">
          <p className=" font-semibold text-gray-400 line-through lg:text-xl text-md lg:leading-6 leading-5 mt-4 font-abc">
            Tk: {price}
          </p>
          <span className="inline font-semibold, lg:text-2xl text-xl lg:leading-6 leading-5 font-abc mt-4 font-bold">
            Tk: {discount}
          </span>
        </div>

        <button
          onClick={openModal}
          className="flex underline gap-2 hover:text-gray-600 items-center me-12  text-indigo-600 font-bold"
        >
          {" "}
          <PiToiletPaperLight className="text-2xl " /> Size Guide
        </button>
      </div>

      <p className="font-abc font-semibold mt-4">{extraInfo?.toUpperCase()}</p>
      {/* sizes start */}
      <div className="flex flex-row gap-2 mt-2 flex-wrap">
        {sizes.map((item: string, index) => (
          <div
            key={index}
            className={`${
              selectedIndex === index
                ? "transition border cursor-pointer hover:shadow-md font-bold bg-gray-800 text-gray-100 px-6 py-1 duration-100"
                : "transition border cursor-pointer hover:shadow-md px-6 py-1 duration-100"
            }`}
            onClick={() => handleSize(item, index)}
          >
            {item.replace(/\s/g, "").toUpperCase()}
          </div>
        ))}
      </div>
      {/*  sizes end  */}

      {/* // warning  */}
      <div style={warning ? { display: "block" } : { display: "none" }}>
        <p className="bg-red-200 border font-semibold text-red-700 border-red-700 rounded-sm p-2 text-xl text-center mt-2 duration-100 font-abc">
          দয়া করে সাইজ নির্ধারণ করুন
        </p>
      </div>
      {/* // stock check  */}

      {!stock && (
        <div className="text-white bg-red-500 font-mont font-semibold text-center mt-4 p-2 tracking-wide">
          Stock Out...
        </div>
      )}

      {stock && (
        <div>
          {/* // quantity start */}
          <div className="mt-4">
            <div className="flex flex-row items-center justify-between">
              <p className=" font-semibold text-base leading-4 text-gray-600 font-abc">
                পরিমান নির্ধারণ করুন
              </p>
              <div className="flex">
                <span
                  onClick={minusCount}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border text-2xl border-gray-300 border-r-0 w-10 h-10 flex items-center justify-center pb-1"
                >
                  -
                </span>
                <input
                  id="counter"
                  aria-label="input"
                  className="border text-black text-xl font-semibold border-gray-300 text-center w-14 pb-2 h-10"
                  type="text"
                  value={count + 1 }
                  onChange={(e) => e.target.value}
                />
                <span
                  onClick={addCount}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer text-2xl border border-gray-300 border-l-0 w-10 h-10 flex items-center justify-center pb-1 "
                >
                  +
                </span>
              </div>
            </div>
          </div>
          {/* // quantity end  */}
          
            <button onClick={()=>addCount()} className="focus:outline-none focus:ring-2 duration-200 hover:bg-red-700 focus:ring-offset-2 focus:ring-gray-800  text-base text-white tracking-wide bg-orange-500 w-full py-4 lg:mt-4 mt-2 font-medium flex items-center justify-center gap-2">
              <span> কার্টে যোগ করুন</span> <span><IoCartSharp className="text-2xl"/></span> 
            </button>
            {paymentCost?.cartTotalQuantity > 0 && <Link href="/shoppingCart"> <button
            className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 duration-200 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-blue-600 w-full py-4 lg:mt-4 mt-2"
          >
            অর্ডার করুন
          </button></Link>}
          
          <a href="tel:+8801648141727" className="flex items-center gap-2">
            <button className="focus:outline-none focus:ring-2 duration-200 bg-green-500 focus:ring-offset-2 focus:ring-gray-800  text-base text-white tracking-wide hover:bg-gray-500 w-full py-4 lg:mt-4 mt-2 font-medium">
             আমাদের সাথে সরাসরি কথা বলুন 
            </button>
            </a>
            
          <hr className="h-1 my-2 bg-gray-700 border-0 rounded dark:bg-gray-700" />
        </div>
        
      )}
      
      {/* // stock check end  */}

      <div
        className=" leading-6 text-gray-600 mt-7 dark:text-gray-400 font-normal text-sm font-mont"
        dangerouslySetInnerHTML={{ __html: shortDescription }}
      ></div>

      <hr className=" bg-gray-200 w-full mt-4" />
    </div>
  );
};

export default DetailsContent;
