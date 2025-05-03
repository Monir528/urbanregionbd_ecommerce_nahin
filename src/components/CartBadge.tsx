"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxToolKit/store";
import { ClientOnly } from "@/components/ClientOnly";

export function CartBadge() {
  const cart = useSelector((state: RootState) => state.cart);

  if (!cart?.cartItems?.length) return null;

  return (
    <ClientOnly>
      <span className="relative mt-[-18px] ml-[-10px] flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </ClientOnly>
  );
}
