"use client";

import { useParams } from "next/navigation";
import {useGetProductsQuery} from "@/components/api/productApi";
import {useEffect} from "react";
import QuickView from "@/components/QuickView";
import ProductListSkeleton from "@/components/ProductListSkeleton/ProductListSkeleton";
import ProductLayout2 from "@/components/ProductLayout/ProductLayout2";
import {Product} from "@/types/product";

const ViewOrder = () => {
    const { categoryName } = useParams();
    const { data, isSuccess, isLoading } = useGetProductsQuery(undefined);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Normalize categoryName to a string and decode URL-encoded characters
    const categoryNameString = Array.isArray(categoryName)
        ? decodeURIComponent(categoryName[0])
        : categoryName
            ? decodeURIComponent(categoryName)
            : "";

    return (
        <main>
            <div className="bg-white " id={categoryNameString}>
                <QuickView />

                <div className="container min-h-[100vh] mt-4 mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl cat-button font-bold  text-indigo-600 bg-gray-100 font-abc p-2 mb-4">
                        {categoryNameString?.toUpperCase()}
                    </h2>
                    {isLoading && <ProductListSkeleton />}

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md-grid-cols-4 lg:grid-cols-6">
                        {isSuccess &&
                            !isLoading &&
                            data

                                ?.filter(
                                    (item: Product) =>
                                        item?.description?.category?.toLowerCase() ===
                                        categoryNameString?.toLowerCase()
                                )
                                ?.map((item: Product) => <ProductLayout2 key={item?._id} data={item} />)}
                    </div>
                </div>
                {/*<FooterBanner></FooterBanner>*/}
            </div>
        </main>
    );
};

export default ViewOrder;
