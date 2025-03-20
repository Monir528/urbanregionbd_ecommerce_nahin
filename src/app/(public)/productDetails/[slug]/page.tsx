"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useNavBarContext } from "@/context/NavBarContext";
import QuickView from "@/components/QuickView";
import DetailsSkeleton from "@/components/DetailsSkeleton/DetailsSkeleton";
import DetailsImage from "@/components/DetialsImage/DetailsImage";
import DetailsContent from "@/components/DetailsContent/DetailsContent";
import {useGetProductsQuery, useGetSingleProductQuery} from "@/components/api/productApi";
import CategoryPage from "@/components/CategoryPage";
import SubCategoryPage from "@/components/SubCategoryPage";
// import FooterBanner from "@/components/FooterBanner";

// Define the Product type (adjust based on actual API response)
// interface Product {
//     id: string;
//     images: string[];
//     description: {
//         text: string;
//         videoLink?: string;
//         category?: string;
//         subcategory?: string;
//     };
//     category: {
//         name: string;
//     };
// }

const ProductDetailsPage = () => {
    const params = useParams();
    const productId = params.slug as string; // Ensure ID is a string

    const { data: product, isLoading, isError, isSuccess } = useGetSingleProductQuery(productId);
    const { open } = useSelector((state) => state?.popUp);
    const { data: allProductData, isSuccess: allProductSuccess } = useGetProductsQuery();
    const { productCategory } = useNavBarContext();

    // Update category in NavBarContext when data is available
    useEffect(() => {
        if (product?.category?.name) {
            productCategory.update(product.category.name);
        }
    }, [product, productCategory]);

    if (isLoading) {
        return <DetailsSkeleton />;
    }

    if (isError || !product) {
        return (
            <main className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold">Failed to load product details</h1>
            </main>
        );
    }

    console.log("single product:", product);

    return (
        <div>
            {open && <QuickView />}
            <div className="2xl:container 2xl:mx-auto lg:py-8 lg:px-20 md:py-12 md:px-6 py-4 px-4">
                <div className="flex justify-center items-center lg:items-start lg:flex-row flex-col gap-8">
                    <DetailsImage images={product?.images} />
                    <DetailsContent desc={product?.description} img={product?.images} />
                </div>

                {/* Embedded YouTube Video */}
                {product?.description?.videoLink && (
                    <div
                        className="aspect-w-16 aspect-h-9 mt-8 container"
                        dangerouslySetInnerHTML={{ __html: product.description.videoLink }}
                    />
                )}
            </div>

            {/* Items by the same category */}
            {allProductSuccess && isSuccess && (
                <CategoryPage data={allProductData} category={product?.description?.category} />
            )}

            {/* Items by the same subcategory */}
            {allProductSuccess && isSuccess && (
                <SubCategoryPage data={allProductData} subcategory={product?.description?.subcategory} />
            )}

            <div className="mb-16"></div>
            {/*<FooterBanner />*/}
        </div>
    );
};

export default ProductDetailsPage;
