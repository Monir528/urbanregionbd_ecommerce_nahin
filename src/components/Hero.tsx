"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Example array of images (you can update with your own image paths)
const sliderImages = [
    "/urbanregion.jpg",
    "/urbanregion1.png",
    "/urbanregion2.jpg",
];

const HeroCarousel = () => {
    // Slider settings; adjust as needed
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className="w-full max-h-[82vh] overflow-hidden">
            <div className="slider-container">
                <Slider {...settings} appendDots={(dots: React.ReactNode) => (
                    <div className="mt-4">
                        <ul className="flex justify-center gap-2">{dots}</ul>
                    </div>
                )}>
                    {sliderImages.map((src, index) => (
                        <div key={index} className="relative">
                            <Image
                                src={src}
                                width={580} height={920}
                                alt={`Slide ${index + 1}`}
                                className="w-full object-cover"
                                unoptimized={true} // Remove if you want Next.js optimization
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default HeroCarousel;

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}
