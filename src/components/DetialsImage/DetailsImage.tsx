import { useState, 
  // useRef, useEffect 
} from "react";
import Image from "next/image";
import { ProductImage } from "@/types/product";

// Custom Image Magnify Component
// interface ImageMagnifyProps {
//   src: string;
//   alt?: string;
//   width?: number;
//   height?: number;
//   magnifierSize?: number;
//   zoomLevel?: number;
//   className?: string;
// }

// const ImageMagnify = ({ 
//   src, 
//   alt = "Magnifiable image",
//   width = 400,
//   height = 400,
//   magnifierSize = 150,
//   zoomLevel = 3.5,
//   className = ""
// }: ImageMagnifyProps) => {
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
//   const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
//   const imgRef = useRef<HTMLImageElement>(null);

//   useEffect(() => {
//     if (imgRef.current) {
//       const img = imgRef.current;
//       if (img.complete && img.naturalWidth > 0) {
//         // Image is already loaded
//         setImgSize({ width: img.naturalWidth, height: img.naturalHeight });
//       } else {
//         // Image is still loading, wait for load event
//         const handleLoad = () => {
//           setImgSize({ width: img.naturalWidth, height: img.naturalHeight });
//         };
//         img.addEventListener('load', handleLoad);
//         return () => img.removeEventListener('load', handleLoad);
//       }
//     }
//   }, [src]);

//   const handleMouseEnter = () => {
//     setShowMagnifier(true);
//   };

//   const handleMouseLeave = () => {
//     setShowMagnifier(false);
//   };

//   const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
//     if (!imgRef.current || imgSize.width === 0 || imgSize.height === 0) return;

//     const rect = imgRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // Keep magnifier within image bounds
//     const magnifierX = Math.max(magnifierSize / 2, Math.min(x, rect.width - magnifierSize / 2));
//     const magnifierY = Math.max(magnifierSize / 2, Math.min(y, rect.height - magnifierSize / 2));

//     setMagnifierPos({ x: magnifierX, y: magnifierY });
//   };

//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     const target = e.currentTarget;
//     target.onerror = null; // prevent infinite loop
//     target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg';
//   };

//   return (
//     <div className={`relative inline-block ${className}`}>
//       <Image
//         ref={imgRef}
//         src={src}
//         alt={alt}
//         width={width}
//         height={height}
//         className="block cursor-crosshair w-full h-auto"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onMouseMove={handleMouseMove}
//         onError={handleImageError}
//         draggable={false}
//       />

//       {showMagnifier && imgSize.width > 0 && imgSize.height > 0 && (
//         <div
//           className="absolute pointer-events-none border-2 border-gray-300 rounded-full shadow-lg bg-white z-50"
//           style={{
//             width: magnifierSize,
//             height: magnifierSize,
//             left: magnifierPos.x - magnifierSize / 2,
//             top: magnifierPos.y - magnifierSize / 2,
//             backgroundImage: `url(${src})`,
//             backgroundSize: `${imgSize.width * zoomLevel}px ${imgSize.height * zoomLevel}px`,
//             backgroundPosition: `-${(magnifierPos.x / width) * imgSize.width * zoomLevel - magnifierSize / 2}px -${(magnifierPos.y / height) * imgSize.height * zoomLevel - magnifierSize / 2}px`,
//             backgroundRepeat: 'no-repeat',
//           }}
//         />
//       )}
//     </div>
//   );
// };

const DetailsImage = ({ images }: { images: ProductImage[] }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full sm:w-auto md:w-8/12 pt-0 lg:pt-12 lg:w-6/12 flex flex-col-reverse lg:flex-row gap-4">
      {/* Optional images */}
      <div 
        className="w-full lg:w-2/12 grid lg:grid-cols-1 grid-cols-3 gap-6" 
        
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-24 h-24 bg-gray-100 flex justify-center items-center py-2 overflow-hidden cursor-pointer transition-all duration-200 ${
              selected === index ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
            }`}
            onClick={() => setSelected(index)}
          >
            <Image
              width={80}
              height={80}
              unoptimized
              src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[index].filename}`}
              alt={`Product preview ${index + 1}`}
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null; // prevent infinite loop
                target.src = process.env.DEFAULT_IMAGE_URL || '/assets/default-ui-image.jpg';
              }}
            />
          </div>
        ))}
      </div>

      {/* Main image with magnify */}
      <div className="lg:w-10/12 bg-gray-100 flex justify-center items-center p-4">
        <div className="max-w-md mx-auto">
          {images[selected] && (
            <Image
              width={450}
              height={350}
              src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[selected].filename}`}
              alt={`Product image ${selected + 1}`}
              className="w-full"
            />
            // <ImageMagnify
            //   src={`${process.env.NEXT_PUBLIC_ROOT_API}/Images/${images[selected].filename}`}
            //   alt={`Product image ${selected + 1}`}
            //   width={450}
            //   height={350}
            //   magnifierSize={120}
            //   zoomLevel={0.5}
            //   className="w-full"
            // />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsImage;