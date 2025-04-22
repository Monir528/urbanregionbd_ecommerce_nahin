'use client';

import jerseyCombo from "../../../public/jersey-combo1.png";
import cargoCombo from "../../../public/cargo_combo.png";
import { useGetProductsQuery } from "@/components/api/productApi";
import RightCart from "@/components/RightCart";
import Notice from "@/components/Notice";
import NewCategory from "@/components/NewCategory/NewCategory";
import CategoryItem2 from "@/components/CategoryItem/CategoryItem2";
import CategoryItem3 from "@/components/CategoryItem/CategoryItem3";
import Services from "@/components/Services";
import ProductListSkeleton from "@/components/ProductListSkeleton/ProductListSkeleton";
import SampleProduct from "@/components/SampleProduct/SampleProduct";
import Banner from "@/components/Banner";
import Blogs from "@/components/Blogs";
import Products from "@/components/Products/Products";
import ShoppingCartForm from "@/components/ShoppingCartForm";
import Popup from "@/components/Popup";
import Bars from "@/components/Bars";
import { useState } from "react";
import { BannerDataType } from "@/types/bannerData";
import BannerCarousel from "@/components/Hero";
import useCarouselImages from "@/hooks/useCarouselImages";

const BannerData: BannerDataType = {
    discount: "২১ টি ভিন্ন ডিজাইন থেকে বেছে নিন আপনার পছন্দ মত জার্সি গুলো। ",
    title: "Summer Offer",
    title2: "Combo Offer",
    image: jerseyCombo,
    title3: "৫ টি জার্সি মাত্র ৯৫০ টাকা",
    title4: "২১ টি ভিন্ন ভিন্ন ডিজাইনের জার্সি পছন্দ করে নিতে এখনই ক্লিক করুন।",
    bgColor: "#777",
    date: ''
};

const BannerData2: BannerDataType = {
    discount: "Summer Sale",
    title: "6 Pocket, 8 Pocket Cargo",
    image: cargoCombo,
    title2: "Combo Offer",
    title3: "3 টি কার্গো মাত্র ১৯৫০ টাকা",
    title4: "১১ টি ভিন্ন ভিন্ন ডিজাইনের কার্গো পছন্দ করে নিতে এখনই ক্লিক করুন।",
    bgColor: "#E5D3B3",
    date: ''
};

const bars = [
    {
        style: "text-[#cc8119] bg-[#fcf4e9]",
        heading: "NEW ARRIVAL",
        text: "",
        textStyle: "mb-[-14px] mt-[4px]",
    },
    {
        style: "text-[#009688] bg-[#ccf7f1]",
        text: "THE BEST QUALITY OUTFIT",
        heading: "TOP RATED",
        textStyle: "mb-[-14px] mt-[4px]",
    },
    {
        style: "text-[#9059a1] bg-[#d5c1dc]",
        text: "THE BEST QUALITY OUTFIT",
        heading: "FLASH DEALS",
        textStyle: "mb-[-14px] mt-[4px]",
    },
];

const HomePage = () => {
    const [orderPopup, setOrderPopup] = useState(false);
    const { data, isSuccess, isLoading } = useGetProductsQuery(undefined);
    const { images: carouselImages, loading: carouselLoading, error: carouselError } = useCarouselImages();

    const handleOrderPopup = () => {
        setOrderPopup(false);
    };

    return (
        <main>
            <div>
                <RightCart></RightCart>
                {carouselLoading ? (
                  <div className="h-[88vh] flex items-center justify-center">Loading carousel...</div>
                ) : carouselError ? (
                  <div className="h-[88vh] flex items-center justify-center text-red-500">{carouselError}</div>
                ) : (
                  <BannerCarousel images={carouselImages} />
                )}
                <div className={"px-8"}>
                    <Notice></Notice>
                    <Bars item={bars[0]} id="new arrival"></Bars>
                    <NewCategory></NewCategory>
                    {/*<CategoryItem />*/}
                    <CategoryItem2 />
                    <CategoryItem3/>
                    <Services />
                    <Bars item={bars[1]} id="top rated"></Bars>
                    {/* top rated  */}
                    {
                        isLoading && <ProductListSkeleton/>
                    }
                    {
                        !isLoading && isSuccess && data && <SampleProduct data={data}></SampleProduct>
                    }
                    <Banner data={BannerData} />
                    <Bars item={bars[2]} id="flash deals"></Bars>
                    {/* // flash deals   */}
                    {
                        !isLoading && isSuccess && data && <Products data={data}></Products>
                    }
                    <Banner data={BannerData2} />
                    <Blogs />
                </div>

                 {/* <AppStore></AppStore> */}
                {/*<FooterBanner></FooterBanner>*/}
                <ShoppingCartForm></ShoppingCartForm>
                <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
            </div>
        </main>

    );
};

export default HomePage;
