import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart, getTotals, removeFromCart } from "@/components/api/cartSlice";

const SingleCartItem = ({product}) => {

  const {cartQuantity, image, name, price, id} = product || {}
  const cart = useSelector((state) => state.cart);
  const dispatch= useDispatch()
  const [count, setCount] = useState(cartQuantity);

  const subString= id?.split(">>>")[1]

  let modifiedName;
  if (name.length > 22) {
    modifiedName = name.substring(0, 19) + "...";
  } else {
    modifiedName = name;
  }

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const minusCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      dispatch(decreaseCart(product));
    }
  };

  const addCount = () => {
    setCount((prev) => prev + 1);
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (product) => {
    // console.log(product);
    dispatch(removeFromCart(product));
  };

  // const handleClearCart = () => {
  //   dispatch(clearCart());
  // };

  return (
    <div>
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200">
        <div className="w-full md:max-w-[126px]">

          <picture>
            <img src={image} alt="Urban region product image" className="mx-auto" />
          </picture>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 w-full">
          <div className="md:col-span-2">
            <div className="flex flex-col max-[500px]:items-center gap-3">
              <h6 className="font-semibold text-base leading-7 text-black">
                {modifiedName}
              </h6>
              <h6 onClick={()=>handleRemoveFromCart(product)} className="font-normal text-base leading-7 cursor-not-allowed text-gray-400 underline">
                Remove
              </h6>
              <h6 className="font-semibold text-base leading-7 text-indigo-600">
                Unit Price: {price}Tk
              </h6>
            </div>
          </div>
          {/* //  */}

          {/* flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 */}

          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3t">
            <div className="flex">
              <span
                onClick={minusCount}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border text-black text-2xl border-gray-300 border-r-0 w-10 h-10 flex items-center justify-center pb-1"
              >
                -
              </span>
              <input
                id="counter"
                aria-label="input"
                className="border text-black text-xl font-semibold border-gray-300 max-h-10 text-center w-14 pb-1"
                type="text"
                value={cartQuantity}
                onChange={(e) => e.target.value}
              />
              <span
                onClick={addCount}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border text-2xl text-black border-gray-300 border-l-0 w-10 h-10 flex items-center justify-center pb-1 "
              >
                +
              </span>
            </div>
          </div>

          {/* size section  */}
          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
            <div className="transition border cursor-pointer font-bold bg-gray-800 text-gray-100 px-4 py-1 duration-100">
              {subString?.toUpperCase()}
            </div>
          </div>
          
          {/* / */}
          <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
            <p className="text-lg leading-8 text-gray-600 text-center">
            {product?.cartQuantity*product?.price} Taka {""}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SingleCartItem;
