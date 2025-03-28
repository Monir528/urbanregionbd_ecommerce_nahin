import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Define the props interface for TypeScript
interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    return (
        <>
            <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div style={{ position: 'relative', width: '100%', height: '88vh' }}>
                            <Image
                                src={image}
                                alt={`Slide ${index + 1}`} // Update with descriptive alt text if needed
                                layout="fill" objectFit="cover"
                                // objectFit is no longer needed; it defaults to "cover"
                            />
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

export default ImageCarousel;