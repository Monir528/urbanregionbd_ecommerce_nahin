"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { Radio } from "react-loader-spinner";
import { usePurchaseOrderMutation } from "@/components/api/confirmOrder/confirmOrder"; // Adjust import path
import { RootState } from "@/reduxToolKit/store";
import { Dialog } from '@headlessui/react'; // For modal UI
import Image from 'next/image';

interface OrderedItem {
  id?: string;
  name?: string;
}

interface Props {
  // orderedItem should be an array of objects with correct id and name for each cart item
  orderedItem?: OrderedItem[];
  onOrderSuccess?: (orderId?: string) => void;
  onShowBkash?: () => void;
  dialogContent?: string;
}

// NOTE: Ensure that the parent component passes orderedItem as an array of objects like:
// [ { id: string, name: string }, ... ]
// where id is the product id and name is the product name.

export default function CustomerAddress({ orderedItem, onOrderSuccess, onShowBkash, dialogContent }: Props) {
  const cart = useSelector((state: RootState) => state.cart);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [division, setDivision] = useState<string>("osd");
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");

  // Handler for payment method change - updates both paymentMethod and selectedGateway
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    // selectedGateway will be updated by the useEffect below
  }
  // Keep selectedGateway in sync with paymentMethod
  useEffect(() => {
    if (paymentMethod === 'online') {
      setSelectedGateway('bkash');
    } else {
      setSelectedGateway('cod');
    }
  }, [paymentMethod]);
  const [selectedGateway, setSelectedGateway] = useState<string>("cod"); // default to 'cod' for cash on delivery
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);

  console.log('CustomerAddress rendered, paymentMethod:', paymentMethod);

  // Add the purchaseOrder mutation hook
  const [
    purchaseOrder,
    {
      data: successData,
      isSuccess: successPurchase,
      isLoading: purchaseLoadingMutation,
    },
  ] = usePurchaseOrderMutation();

  const [bkashPhone, setBkashPhone] = useState('');
  const [bkashTransId, setBkashTransId] = useState('');
  const [bkashLoading, setBkashLoading] = useState(false);
  const [bkashError, setBkashError] = useState('');

  const [orderSuccessCalled, setOrderSuccessCalled] = useState(false);

  // Reset orderSuccessCalled when a new order starts (when orderedItem changes)
  useEffect(() => {
    setOrderSuccessCalled(false);
  }, [orderedItem]);

  const deliveryCharge = division === 'isd' ? 70 : 120;
  const totalPayable = (cart?.cartTotalAmount || 0) + deliveryCharge;

          const handleAddress = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            
            // Form validation
            if (!name.trim()) {
              alert('আপনার নাম দিন');
              return;
            }
            
            if (!address.trim()) {
              alert('আপনার ঠিকানা দিন');
              return;
            }
            
            const phoneInput = document.getElementById('phone-number') as HTMLInputElement;
            if (!phoneInput.checkValidity() || !phone.trim() || phone.length !== 11) {
              setPhoneError('ফোন নম্বর 11 ডিজিট হতে হবে');
              return;
            }
            
            setPhoneError('');
            console.log('handleAddress called');
            console.log('Form submitted. paymentMethod:', paymentMethod);
            
            if (paymentMethod === 'cod') {
              setPurchaseLoading(true);
              try {
                await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/addClient`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name, phone, address, division }),
                });
                
                // Ensure selectedGateway is 'cod' for cash on delivery
                const orderStatus = {
                  name,
                  phone,
                  address,
                  division,
                  orderedItem,
                  date: new Date().toISOString(),
                  total: cart?.cartTotalAmount || 0,
                  status: "pending",
                  paymentMethod: 'cod',
                  selectedGateway: 'cod',
                };
        console.log('Calling purchaseOrder with', orderStatus);
        const result = await purchaseOrder(orderStatus);
        console.log('purchaseOrder result:', result);
        console.log('CustomerAddress.handleAddress FULL RESPONSE:', result);
        console.log('CustomerAddress: calling onOrderSuccess with', result?.data?.insertedId);
        if (!orderSuccessCalled && onOrderSuccess) {
          setOrderSuccessCalled(true);
          onOrderSuccess(result?.data?.insertedId);
        }
      } catch (error) {
        console.error("Order submission error:", error);
      } finally {
        setPurchaseLoading(false);
      }
    } else {
      console.log('Calling onShowBkash from handleAddress');
      if (onShowBkash) onShowBkash();
    }
  };

  const handleBkashPayment = async () => {
    console.log('handleBkashPayment called');
    
    // Form validation for bKash payment
    if (!name.trim()) {
      alert('আপনার নাম দিন');
      return;
    }
    
    if (!address.trim()) {
      alert('আপনার ঠিকানা দিন');
      return;
    }
    
    if (!phone.trim() || phone.length !== 11) {
      setPhoneError('ফোন নম্বর 11 ডিজিট হতে হবে');
      return;
    }
    
    if (!bkashPhone.trim()) {
      setBkashError('বিকাশ নম্বর দিন');
      return;
    }
    
    if (!bkashTransId.trim()) {
      setBkashError('ট্রানজেকশন আইডি দিন');
      return;
    }
    
    setBkashLoading(true);
    setBkashError('');
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/addClient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address, division }),
      });
      
      // Ensure paymentMethod is 'online' and selectedGateway is 'bkash' for online payment
      const orderStatus = {
        name,
        phone,
        address,
        division,
        orderedItem,
        date: new Date().toISOString(),
        total: cart?.cartTotalAmount || 0,
        status: "pending",
        paymentMethod: 'online',
        selectedGateway: 'bkash',
        payment: {
          phone: bkashPhone,
          transId: bkashTransId,
        },
        paid: deliveryCharge,
      };
      console.log('Calling purchaseOrder with', orderStatus);
      const result = await purchaseOrder(orderStatus);
      console.log('purchaseOrder result:', result);
      console.log('CustomerAddress.handleBkashPayment FULL RESPONSE:', result);
      console.log('CustomerAddress: calling onOrderSuccess with', result?.data?.insertedId);
      if (!orderSuccessCalled && onOrderSuccess) {
        setOrderSuccessCalled(true);
        onOrderSuccess(result?.data?.insertedId);
      }
    } catch {
      setBkashError('পেমেন্ট ভেরিফিকেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setBkashLoading(false);
    }
  };

  useEffect(() => {
    if (successPurchase && successData && paymentMethod === "cod") {
      console.log('CustomerAddress.useEffect FULL RESPONSE:', successData);
      console.log('CustomerAddress.useEffect orderId:', successData?.insertedId);
      console.log('CustomerAddress: calling onOrderSuccess with', successData?.insertedId);
      if (!orderSuccessCalled && onOrderSuccess) {
        setOrderSuccessCalled(true);
        onOrderSuccess(successData?.insertedId);
      }
    }
  }, [successPurchase, successData, paymentMethod, onOrderSuccess, orderSuccessCalled]);

  return (
    <div className={`isolate bg-white px-6 lg:px-8${dialogContent === 'bkash' ? ' blur-sm pointer-events-none select-none' : ''}`}>
      {(purchaseLoading || purchaseLoadingMutation) && (
        <Radio
          visible={true}
          height="40"
          width="40"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass="radio-wrapper"
          colors={["#6366f1", "#a5b4fc", "#a5b4fc"]}
        />
      )}
      {dialogContent === 'form' && (
        <form onSubmit={handleAddress} className="mx-auto max-w-xl flex flex-col gap-4">
          <div>
            <label htmlFor="first-name" className="block  text-left font-semibold leading-6 text-black">
              আপনার নাম <span className="text-red-600 text-md text-left">*</span>
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="full-name"
                id="full-name"
                autoComplete="given-name"
                required
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-md text-left font-semibold leading-6 text-black">
              ফোন নম্বর <span className="text-red-600 text-md text-left font-bold">*</span>
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-6 text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                pattern="[0-9]{11}"
                maxLength={11}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-24 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {phoneError && <p className="mt-1 text-sm text-red-600 text-left ml-10">{phoneError}</p>}
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-md text-left font-bold leading-6 text-black">
              ঠিকানা <span className="font-bold text-lg text-left text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                name="street-address"
                id="street-address"
                autoComplete="street-address"
                className="block pl-4 w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>

          <div className="border my-4 p-4 rounded-md">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black text-left">শিপিং মেথড</p>
              <hr />
              <label className="text-black flex items-center justify-between">
                <span>
                  <input
                    onChange={(e) => setDivision(e.target.value)}
                    type="radio"
                    checked={division === "isd"}
                    name="myRadio"
                    value="isd"
                  />{" "}
                  ঢাকার ভিতর
                </span>
                <span className="font-bold text-black ml-2">Tk 60.00</span>
              </label>
              <label className="text-black flex items-center justify-between">
                <span>
                  <input
                    onChange={(e) => setDivision(e.target.value)}
                    type="radio"
                    name="myRadio"
                    checked={division === "osd"}
                    value="osd"
                  />{" "}
                  ঢাকার বাহির
                </span>
                <span className="font-bold text-black ml-2">Tk 120.00</span>
              </label>
            </div>
          </div>

          <div className="border my-4 p-4 rounded-md">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black text-left">পেমেন্ট মেথড</p>
              <hr />
              <label className="text-black flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => handlePaymentMethodChange("cod")}
                />
                ক্যাশ অন ডেলিভারি
              </label>
              <label className="text-black flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => handlePaymentMethodChange("online")}
                />
                অনলাইন পেমেন্ট
              </label>
            </div>
          </div>

          <div className="mt-2">
            <button
              type="submit"
              onClick={() => console.log('Submit button clicked')}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-6 font-base text-xl"
            >
              অর্ডার কনফর্ম করুন
            </button>
          </div>
        </form>
      )}
      {dialogContent === 'bkash' && (
        <Dialog open={true} onClose={() => {}} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-auto flex flex-col items-center">
              <Image src="/bkash_logo.png" alt="Bkash Logo" width={96} height={96} className="mb-2" />
              <p className="font-bold text-lg text-gray-900 mb-1">মোট পরিশোধযোগ্য: <span className="text-pink-600 text-2xl">{totalPayable} টাকা</span></p>
              <div className="text-center mb-4">
                <p className="font-bold text-xl text-pink-600">bKash Payment</p>
                <div className="text-xs text-gray-800 mt-2 text-left bg-[#fce4ec] p-3 rounded-md divide-y divide-[#f8bbd0] w-full">
                  <p className="mb-2"><span className="text-pink-600 font-bold">*247#</span> ডায়েল করে আপনার Bkash মোবাইল মেনু তে যান অথবা BKASH App এ যান।</p>
                  <hr className="my-1 border-[#f8bbd0]" />
                  <p className="mb-2"><span className="text-pink-600 font-bold">2. Payment</span> এ ক্লিক করুন।</p>
                  <hr className="my-1 border-[#f8bbd0]" />
                  <div className="flex items-center mb-2 gap-1">
                    <span>প্রাপক নম্বর:</span>
                    <span className="text-pink-600 font-bold select-all">01858124027</span>
                    <button type="button" onClick={() => {navigator.clipboard.writeText('01858124027')}} className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Copy</button>
                  </div>
                  <hr className="my-1 border-[#f8bbd0]" />
                  <p className="mb-2">সব কিছু ঠিক থাকলে BKASH থেকে একটি বার্তা পাবেন।</p>
                  <hr className="my-1 border-[#f8bbd0]" />
                  <p>আপনার বিকাশ নম্বর ও <span className="text-pink-600 font-bold">Transaction ID</span> নিচের ফর্মে দিন।</p>
                </div>
                <div className="text-xs mt-2 text-right">
                  <a href="tel:01858124027" className="text-blue-600 underline hover:text-blue-800">Need help?</a>
                </div>
              </div>
              <input type="text" value={bkashPhone} onChange={e => setBkashPhone(e.target.value)} placeholder="Bkash নম্বর" className="w-full border rounded-md p-2 mb-2 text-black" />
              <input type="text" value={bkashTransId} onChange={e => setBkashTransId(e.target.value)} placeholder="Transaction ID" className="w-full border rounded-md p-2 mb-2 text-black" />
              {bkashError && <p className="text-red-600 text-sm mb-2">{bkashError}</p>}
              <button disabled={bkashLoading} onClick={handleBkashPayment} className="w-full bg-pink-600 text-white rounded-md p-2 font-bold mt-2 disabled:opacity-60">
                {bkashLoading ? 'Processing...' : 'Verify & Confirm'}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
