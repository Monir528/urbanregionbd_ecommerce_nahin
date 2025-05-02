"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/reduxToolKit/store";
import CarouselImagesGrid from "@/components/CarouselImagesGrid";
import CarouselImageUploadBox from "@/components/CarouselImageUploadBox";
import { fetchCarouselImages } from "@/reduxToolKit/carouselImagesSlice";

const CarouselImagesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.carouselImages);

  useEffect(() => {
    dispatch(fetchCarouselImages());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Carousel Images</h1>
      <CarouselImageUploadBox />
      <div className="mt-8">
        <CarouselImagesGrid />
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default CarouselImagesPage;
