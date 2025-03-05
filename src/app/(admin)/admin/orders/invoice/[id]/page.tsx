"use client";
import { useParams } from "next/navigation";
import InvoiceHeader from "@/components/Invoice/InvoiceHeader";
import InvoiceDetails from "@/components/Invoice/InvoiceDetails";
import InvoiceTotal from "@/components/Invoice/InvoiceTotal";




const ProductDetailsPage = () => {
    const params = useParams();
    const productId = params.slug as string; // Ensure ID is a string
    let {state}=useLocation()
    return (
        <main>
            <div className="Invoice">
                <div className="container">
                    <InvoiceHeader details={state}/>
                    <InvoiceDetails details={state}/>
                    <InvoiceTotal details={state} />
                </div>
            </div>
        </main>
    );
};

export default ProductDetailsPage;
