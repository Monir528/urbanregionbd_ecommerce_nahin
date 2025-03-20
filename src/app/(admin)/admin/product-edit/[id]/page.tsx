"use client";
import { useParams } from "next/navigation";
import "@fontsource/rajdhani";
import {useGetSingleProductQuery} from "@/components/api/productApi";
import EditForm from "@/components/EditForm";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { data, isLoading, isSuccess } = useGetSingleProductQuery(id);

    return (
        <main>
            {
                isLoading && "Sorry for loading..."
            }
            {
                !isLoading && isSuccess && data?.description && <EditForm data={data}/>
            }
        </main>
    );
};

export default ProductDetailsPage;
