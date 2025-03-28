// // import { useRef } from "react";
// "use client";
// import dynamic from "next/dynamic";
// import CarouselItem from "@/components/CarouselItem";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { CategoryPageTypeDef } from "@/types/type";
//
// const Slider = dynamic(() => import("react-slick"), { ssr: false });
//
// function AutoPlayMethods({ category, data }: CategoryPageTypeDef) {
//
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 700,
//         autoplay: true,
//         slidesToShow: 6,
//         adaptiveHeight: false,
//         arrows: false,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 3,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 580,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 2,
//                     initialSlide: 2,
//                 },
//             },
//             {
//                 breakpoint: 400,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//     };
//
//     return (
//         <div className="px-4 py-8">
//             <h3 className={"text-xl font-bold mb-4 text-black"}>Similar Category</h3>
//             <Slider {...settings }>
//                 {data
//                     ?.filter((item) => item?.description?.category === category)
//                     .map((item) => (
//                         <div key={item._id} className="px-2">
//                             <CarouselItem data={item} />
//                         </div>
//                     ))}
//             </Slider>
//         </div>
//     );
// }
//
// export default AutoPlayMethods;

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {CategoryPageTypeDef} from "@/types/type";
import CarouselItem from "@/components/CarouselItem";


const AutoPlayMethods: React.FC<CategoryPageTypeDef> = ({ category, data }) => {
    return (
        <>
            <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                autoplay={{ delay: 3000 }}
                loop={true}
                spaceBetween={0}
                slidesPerView={6}
                breakpoints={{
                    374: {
                        // width: 576,
                        slidesPerView: 2,
                    },
                    768: {
                        // width: 768,
                        slidesPerView: 4,
                    },
                    1236: {
                        // width: 768,
                        slidesPerView: 5,
                    },
                    1636: {
                        // width: 768,
                        slidesPerView: 7,
                    },
                }}
            >
                {data?.filter((item) => item?.description?.category === category).map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="px-2">
                            <CarouselItem data={item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx global>{`
                .swiper-pagination-bullet {
                    background-color: #807070; /* Inactive dot color */
                }

                .swiper-pagination-bullet-active {
                    background-color: #000; /* Active dot color */
                }

                .swiper-button-next,
                .swiper-button-prev {
                    color: #fff; /* Arrow color */
                    background-color: rgba(10, 10, 10, 0.28);
                    padding: 6px;
                    border-radius: 5px /* Inactive dot color */;
                }
            `}</style>
        </>
    );
};

export default AutoPlayMethods;