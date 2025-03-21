"use client";

import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { orderFormClose } from "@/components/cartHandler";
import {getTotals} from "@/components/api/cartSlice"
import CustomerAddress from "@/components/CustomerAddress";
import { RootState } from "@/reduxToolKit/store";

export default function OrderForm() {
  const {formCondition}= useSelector((state:RootState)=>state.cartHandler);
  const dispatch= useDispatch()
  const cancelButtonRef = useRef(null);

  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const orderedItem= cart?.cartItems

  return (
    <Transition.Root show={formCondition} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={()=>dispatch(orderFormClose())}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden my-16 lg:mt-20 rounded-lg bg-white text-left shadow-xl transition-all  sm:w-full sm:max-w-lg">
                <div className="bg-gray-50 py-3 flex p-8 items-center">
                  <p className="text-black text-center font-semibold text-base md:text-lg">
                    ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন
                  </p>
                  <span onClick={()=>dispatch(orderFormClose())} className="font-bold cursor-pointer text-2xl ml-4 text-red-500">
                    <RxCross2></RxCross2>
                  </span>
                </div>

                <div className="bg-white px-4  sm:p-6 sm:pb-4">
                  <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <CustomerAddress orderedItem={orderedItem}></CustomerAddress>
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
