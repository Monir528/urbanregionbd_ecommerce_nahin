// import { useRef } from "react";
import dynamic from "next/dynamic";
import CarouselItem from "@/components/CarouselItem";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CategoryPageTypeDef } from "@/types/type";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function AutoPlayMethods({ category, data }: CategoryPageTypeDef) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        autoplay: true,
        slidesToShow: 6,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <h3 className={"text-black"}>Similar Category</h3>
            <Slider {...settings} customPaging={(i) => <div>{i + 1}</div>}>
                {data
                    ?.filter((item) => item?.description?.category === category)
                    .map((item) => (
                        <CarouselItem key={item._id} data={item} />
                    ))}
            </Slider>
        </div>
    );
}

export default AutoPlayMethods;