"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";

interface OrderSuccessModalProps {
  open: boolean;
  onClose: () => void;
  orderId?: string;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ open, onClose, orderId }) => {
  console.log('OrderSuccessModal orderId:', orderId);
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
        <div className="relative bg-white rounded-lg p-8 w-full max-w-md mx-auto flex flex-col items-center text-center shadow-xl">
          {/* Success Vector Illustration */}
          <Image src="/success_vector.svg" alt="Order Success" width={120} height={120} className="mb-4" />
          <h1 className="text-3xl font-bold mb-3 text-green-600">Thank you for your order!</h1>
          {orderId && (
            <div className="mb-4">
              <span className="text-gray-600 text-base">Order ID:</span>
              <span className="ml-2 text-indigo-600 font-semibold text-lg select-all">{orderId}</span>
            </div>
          )}
          <p className="text-lg mb-6 text-gray-700">
            Your order has been received and is being processed.<br />
            You will receive an email confirmation shortly.
          </p>
          <button
            onClick={onClose}
            className="inline-block bg-green-500 text-white py-2 px-8 rounded transition-colors duration-300 hover:bg-green-600 font-semibold text-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderSuccessModal;
