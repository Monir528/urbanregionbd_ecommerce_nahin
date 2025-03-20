import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { popUpClose } from "@/components/api/quickViewSlice";
import { addToCart } from "@/components/api/cartSlice";
import { makeSizes } from "@/utils/sizes";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function QuickView() {
  const dispatch = useDispatch();
  const { value, open } = useSelector((state) => state?.popUp);
  const { _id, description, images } = value || {};
  const [selectSize, setSelectSize] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(false);

  const sizes = makeSizes(description?.extra);

  const handleSize = (value, index) => {
    setWarning(false);
    setSelectSize(value);
    setSelectedIndex(index);
  };

  const addCount = () => {
    if (!selectSize) {
      setWarning(true);
    } else {
      setCount((prev) => prev + 1);
      setWarning(false);
      dispatch(
        addToCart({
          id: `${_id}>>>${selectSize}`,
          name: description?.productName,
          image: `${process.env.NEXT_PUBLIC_ROOT_API}/Images/${
            images?.[0]?.filename
          }`,
          price: description?.discount,
          cartQuantity: count,
        })
      );
    }
  };

  return (
    <Transition.Root show={open} as={Fragment} className="mt-14 font-abc">
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(popUpClose())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center text-center items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-0 scale-95"
            >
              <Dialog.Panel className="flex  transform text-left text-base transition my-20 px-4 max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white shadow-2xl p-4 md:p-8">
                  <button
                    type="button"
                    className="absolute right-2 top-1 sm:text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8 z-30 text-red-500"
                    onClick={() => dispatch(popUpClose())}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg m-2 bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <picture>
                        <img
                            src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${
                                images?.[0].filename
                            }`}
                            alt="urban region bd"
                            className="object-cover object-center"
                        />
                      </picture>

                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {description?.productName?.toUpperCase()}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>
                        {/* // price section  */}
                        <div className="flex gap-2 font-medium">
                          <h3 className="text-xl">Price:</h3>
                          <p className="text-xl text-gray-900 font-thin line-through">
                            {description?.price} Taka
                          </p>
                          <p className="text-xl text-gray-900">
                            {description?.discount} Taka
                          </p>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-4"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>
                        {/* // stock check start */}
                        {!value?.description?.stock && (
                          <div className="text-white bg-red-500 font-mont font-semibold text-center mt-4 p-2 tracking-wide">
                            Stock Out...
                          </div>
                        )}
                        {value?.description?.stock && (
                          <form>
                            <div className="flex flex-row gap-2 mt-2 flex-wrap">
                              {sizes.map((item, index) => (
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
                            {/* // warning  */}
                            <div
                              style={
                                warning
                                  ? { display: "block" }
                                  : { display: "none" }
                              }
                            >
                              <p className="bg-red-200 border font-semibold text-red-700 border-red-700 rounded-sm p-1 text-center mt-2 duration-100 font-abc">
                                সাইজ নির্ধারন করুন
                              </p>
                            </div>
                            <p
                              onClick={addCount}
                              className={`focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 cursor-pointer
                            text-center focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-2 md:py-4 lg:mt-4 mt-2 ${
                              warning && "hover:bg-gray-400"
                            }`}
                            >
                              Add to bag
                            </p>
                          </form>
                        )}

                        {/* // stock check end  */}
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
