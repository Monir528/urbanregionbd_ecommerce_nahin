"use client";
import { useParams, useSearchParams } from "next/navigation";
import InvoiceHeader from "@/components/Invoice/InvoiceHeader";
import InvoiceDetails from "@/components/Invoice/InvoiceDetails";
import InvoiceTotal from "@/components/Invoice/InvoiceTotal";
import "@fontsource/rajdhani";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const details = data ? JSON.parse(data) : {};

    return (
        <div className="w-[500px] mx-auto shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]">
            <div className="mt-10 mb-[30px] pb-8">
                <InvoiceHeader details={details} />
                <InvoiceDetails details={details} />
                <InvoiceTotal details={details} />
            </div>
        </div>
    );
};

export default ProductDetailsPage;
