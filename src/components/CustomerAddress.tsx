"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reduxToolKit/store";
import { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { events } from "@/utils/facebookPixel";

import { 
  setCustomerName, 
  setCustomerPhone, 
  setCustomerAddress, 
  setPaymentMethod,
  resetCustomerInfo,
  setSelectedGateway,
  setCustomerDivision
} from "@/components/api/customerSlice";
import { usePurchaseOrderMutation } from "./api/confirmOrder/confirmOrder";





interface CartItem {
  id: string;
  cartQuantity?: number;
  // Add other properties that might be on the cart item
}

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

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { Radio } from 'react-loader-spinner';

export default function CustomerAddress({ orderedItem, onOrderSuccess, onShowBkash, dialogContent }: Props) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { name, phone, address, division, paymentMethod } = useSelector((state: RootState) => state.customer);
  
  const [phoneError, setPhoneError] = useState<string>("");

  // Handler for payment method change - updates payment method and gateway in Redux
  const handlePaymentMethodChange = (method: string) => {
    dispatch(setPaymentMethod(method));
    dispatch(setSelectedGateway(method === 'online' ? 'bkash' : 'cod'));
  }

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

  const deliveryCharge = division === 'isd' ? 60 : 120;
  const totalPayable = (cart?.cartTotalAmount || 0) + deliveryCharge;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerName(e.target.value));
  };

  const handlePhoneChange = (value: string ) => {
    const fullNumber = `+${value}`;
    dispatch(setCustomerPhone(fullNumber));
    console.log('Full number:', fullNumber);

    // Only check for a minimum length (8 digits for any country)
    if (value[3] === '0') {
      setPhoneError('ফোন নম্বরের শুরুতে 0 ব্যবহার করবেন না');
    }else if(value.length < 13) {
      setPhoneError('কমপক্ষে ১১ সংখ্যার একটি বৈধ নম্বর দিন');
    } else {
      setPhoneError('');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerAddress(e.target.value));
  };

  // removed unused handleDivisionChange

  const handleAddress = async (e: React.FormEvent<HTMLFormElement>) => {
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
    
    if (!phone.trim() || phoneError) {
      setPhoneError('দয়া করে সঠিক ফোন নম্বর দিন');
      return;
    }
    
    setPhoneError('');
    console.log('handleAddress called');
    console.log('Form submitted. paymentMethod:', paymentMethod);
    
    if (paymentMethod === 'cod') {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/addClient`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, address, division }),
        });
        
        // Track Purchase event for COD
        const totalValue = cart?.cartTotalAmount || 0;
        const contentIds = cart?.cartItems?.map((item: { id: string }) => item.id) || [];
        const numItems = cart?.cartItems?.reduce((total: number, item: { cartQuantity?: number }) => {
          return total + (item.cartQuantity || 1);
        }, 0) || 0;
        
        events.purchase(totalValue, 'BDT', {
          content_ids: contentIds,
          content_type: 'product',
          num_items: numItems,
          contents: cart?.cartItems?.map((item: { id: string; cartQuantity?: number }) => ({
            id: item.id,
            quantity: item.cartQuantity || 1,
          })) || [],
          payment_method: 'cod',
          order_id: `order_${Date.now()}`,
        });
        
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
      }
    } else {
      console.log('Calling onShowBkash from handleAddress');
      if (onShowBkash) onShowBkash();
    }
  };

  const handleBkashPayment = async () => {
    setBkashLoading(true);
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
    
    if (!phone.trim() || phone.trim().length !== 14) {
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
      
      // Track Purchase event for bKash payment
      const totalValue = cart?.cartTotalAmount || 0;
      const contentIds = cart?.cartItems?.map((item: { id: string }) => item.id) || [];
      const numItems = cart?.cartItems?.reduce((total: number, item: { cartQuantity?: number }) => {
        return total + (item.cartQuantity || 1);
      }, 0) || 0;
      
      events.purchase(totalValue, 'BDT', {
        content_ids: contentIds,
        content_type: 'product',
        num_items: numItems,
        contents: cart?.cartItems?.map((item: CartItem) => ({
          id: item.id,
          quantity: item.cartQuantity || 1,
        })) || [],
        payment_method: 'bkash',
        order_id: `order_${Date.now()}`,
      });
      
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
        // Reset customer info in Redux after successful order
        dispatch(resetCustomerInfo());
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
      {purchaseLoadingMutation && (
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
                onChange={handleNameChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-md text-left font-semibold leading-6 text-black">
              ফোন নম্বর <span className="text-red-600 text-md text-left font-bold">*</span>
            </label>
            <div className="mt-2.5">
              <PhoneInput
                country={'bd'}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'phone-number',
                  id: 'phone-number',
                  required: true,
                  autoComplete: 'tel',
                  maxLength: 17 // reasonable max for international numbers
                }}
                containerClass="phone-input-container"
                inputClass="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                buttonClass="country-dropdown"
                dropdownClass="country-dropdown-list"
                searchClass="country-search"
                enableSearch={true}
                disableSearchIcon={false}
                searchPlaceholder="Search country"
                preferredCountries={['bd', 'us', 'gb', 'in']}
                disableCountryCode={false} // allow country code to be changed via dropdown
                disableDropdown={false} // allow dropdown
                countryCodeEditable={false} // true would allow editing by keyboard, but not supported
              />
              {phoneError && <p className="mt-1 text-sm text-red-600 text-left">{phoneError}</p>}
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="street-address" className="block text-md text-left font-bold leading-6 text-black">
              ঠিকানা <span className="font-bold text-lg text-left text-red-600">*</span>
            </label>
            <div className="mt-2">
              <input
                onChange={handleAddressChange}
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
                    onChange={(e) => dispatch(setCustomerDivision(e.target.value))}
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
                    onChange={(e) => dispatch(setCustomerDivision(e.target.value))}
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
