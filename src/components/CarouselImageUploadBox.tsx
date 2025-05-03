import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadCarouselImage } from "@/reduxToolKit/carouselImagesSlice";
import Cropper from "react-easy-crop";
import { RootState, AppDispatch } from "@/reduxToolKit/store";
import { MdOutlineFileUpload, MdCrop, MdAdd } from "react-icons/md";

const aspect = 1280 / 800;

export default function CarouselImageUploadBox() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.carouselImages);
  const [showCrop, setShowCrop] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<unknown>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setShowCrop(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = (_: unknown, croppedAreaPixels: unknown) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleUpload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    // Crop the image in browser
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const formData = new FormData();
    formData.append("image", croppedBlob, "carousel.jpg");
    dispatch(uploadCarouselImage(formData));
    setShowCrop(false);
    setImageSrc(null);
  };

  return (
    <div>
      <div 
        className="border-dashed border-2 border-gray-400 rounded-lg p-8 w-full text-center hover:bg-gray-50 cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
        onClick={() => fileInput.current?.click()}
      >
        <div className="bg-blue-50 p-4 rounded-full">
          <MdOutlineFileUpload className="text-blue-500 text-4xl" />
        </div>
        <p className="text-lg font-medium text-gray-700">
          + Upload Carousel Image
        </p>
        <p className="text-sm text-gray-500">
          Recommended size: 1280 × 800 pixels
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
      {showCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-medium text-lg flex items-center gap-2">
                <MdCrop /> Crop Carousel Image
              </h3>
              <p className="text-sm text-gray-500">Crop to 1280 × 800 pixels</p>
            </div>
            
            <div className="relative" style={{ height: "500px" }}>
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                objectFit="horizontal-cover"
              />
            </div>
            
            <div className="p-3 bg-gray-50 border-t flex items-center">
              <div className="flex-1 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Zoom:</span>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full max-w-[200px]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition font-medium"
                  onClick={() => {
                    setShowCrop(false);
                    setImageSrc(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleUpload} 
                  disabled={loading}
                >
                  {loading ? "Uploading..." : (
                    <>
                      <MdAdd size={18} /> Upload Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Utility to crop image in browser
async function getCroppedImg(imageSrc: string, crop: unknown): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = (crop as { width: number }).width;
  canvas.height = (crop as { height: number }).height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    (crop as { x: number }).x,
    (crop as { y: number }).y,
    (crop as { width: number }).width,
    (crop as { height: number }).height,
    0,
    0,
    (crop as { width: number }).width,
    (crop as { height: number }).height
  );
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob!);
    }, "image/jpeg");
  });
}
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
