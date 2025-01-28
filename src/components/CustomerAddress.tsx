"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Radio } from "react-loader-spinner";
import { orderFormClose } from "@/components/cartHandler";
import { clearCart } from "@/components/api/cartSlice";

interface OrderedItem {
  id?: string;
  name?: string;
}

export default function CustomerAddress({ orderedItem }: { orderedItem?: OrderedItem }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [division, setDivision] = useState<string>("osd");
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPurchaseLoading(true);

    const orderStatus = {
      name,
      phone,
      address,
      division,
      orderedItem,
      date: new Date().toLocaleString(),
      total: cart?.cartTotalAmount || 0,
      status: "pending",
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderStatus),
      });

      if (response.ok) {
        dispatch(orderFormClose());
        dispatch(clearCart());
        router.push("/paymentPage");
      }
    } catch (error) {
      console.error("Order submission error:", error);
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
      <div className="isolate bg-white px-6 lg:px-8">
        {purchaseLoading && (
            <Radio
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="radio-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        )}
        <form
            onSubmit={handleAddress}
            className="mx-auto max-w-xl flex flex-col gap-4"
        >
          <div>
            <label
                htmlFor="first-name"
                className="block text-md font-semibold leading-6 text-gray-900"
            >
              আপনার নাম <span className="text-red-600 text-md">*</span>
            </label>
            <div className="mt-2.5">
              <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
                htmlFor="phone-number"
                className="block text-md font-semibold leading-6 text-gray-900"
            >
              ফোন নম্বর <span className="text-red-600 text-md font-bold">*</span>
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-6 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option>Ban</option>
                </select>
              </div>
              <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-24 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
                htmlFor="street-address"
                className="block text-md font-bold leading-6 text-gray-900"
            >
              ঠিকানা <span className="font-bold text-lg text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
              />
            </div>
          </div>

          <div className="border my-4 p-4 rounded-md">
            <div className="flex flex-col gap-2">
              <p className="font-bold">শিপিং মেথড</p>
              <hr />
              <label>
                <input
                    onChange={(e) => setDivision(e.target.value)}
                    type="radio"
                    checked={division === "isd"}
                    name="myRadio"
                    value="isd"
                />{" "}
                ঢাকার ভিতর
              </label>

              <label>
                <input
                    onChange={(e) => setDivision(e.target.value)}
                    type="radio"
                    name="myRadio"
                    checked={division === "osd"}
                    value="osd"
                />{" "}
                ঢাকার বাহির
              </label>
            </div>
          </div>

          <div className="mt-2">
            <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-6 font-base text-xl"
            >
              অর্ডার কনফর্ম করুন
            </button>
          </div>
        </form>
      </div>
  );
}