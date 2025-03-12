"use client";

import { useParams } from "next/navigation";
import {useGetProductsQuery} from "@/components/api/productApi";
import {useEffect} from "react";
import QuickView from "@/components/QuickView";
import ProductListSkeleton from "@/components/ProductListSkeleton/ProductListSkeleton";
import ProductLayout2 from "@/components/ProductLayout/ProductLayout2";

const ViewOrder = () => {
    const { categoryName } = useParams();
    const { data, isSuccess, isLoading } = useGetProductsQuery();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            <div className="bg-white " id={categoryName}>
                <QuickView />

                <div className="container min-h-[100vh] mt-4 mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl cat-button font-bold  text-indigo-600 bg-gray-100 font-abc p-2 mb-4">
                        {categoryName?.toUpperCase()}
                    </h2>
                    {isLoading && <ProductListSkeleton />}

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md-grid-cols-4 lg:grid-cols-6">
                        {isSuccess &&
                            !isLoading &&
                            data

                                ?.filter(
                                    (item) =>
                                        item?.description?.category?.toLowerCase() ===
                                        categoryName?.toLowerCase()
                                )
                                ?.map((item) => <ProductLayout2 key={item?._id} data={item} />)}
                    </div>
                </div>
                {/*<FooterBanner></FooterBanner>*/}
            </div>
        </main>
    );
};

export default ViewOrder;
