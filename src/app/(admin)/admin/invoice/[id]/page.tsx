"use client";

import { useParams } from "next/navigation";
import { useGetSingleOrderQuery } from "@/components/api/confirmOrder/confirmOrder";
import InvoiceHeader from "@/components/Invoice/InvoiceHeader";
import InvoiceDetails from "@/components/Invoice/InvoiceDetails";
import InvoiceTotal from "@/components/Invoice/InvoiceTotal";
import "@fontsource/rajdhani";

const InvoicePage = () => {
  // Get dynamic id from the URL
  const { id } = useParams();

  // Fetch order details with the id
  const { data: details, isLoading } = useGetSingleOrderQuery(id);

  // Show a centered loading indicator if data is still being fetched
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  console.log("ordered details", details);

  return (
    <div className="w-[500px] mx-auto shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] bg-white">
      <div className="mt-10 mb-[30px] pb-8">
        <InvoiceHeader details={details} />
        <InvoiceDetails details={details} />
        <InvoiceTotal details={details} />
      </div>
    </div>
  );
};

export default InvoicePage;
