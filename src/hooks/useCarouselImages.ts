import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_API || "";

export default function useCarouselImages() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/carousel-images`)
      .then((res) => {
        setImages(res.data.map((img: any) => `${BASE_URL}/carousel_images/${img.filename}`));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch carousel images");
        setLoading(false);
      });
  }, []);

  return { images, loading, error };
}
