'use client';

import dynamic from 'next/dynamic';

// Dynamically import FacebookPixelProvider with no SSR
const FacebookPixelProvider = dynamic(
  () => import('@/components/FacebookPixelProvider'),
  { ssr: false }
);

export default function FacebookPixel() {
  return <FacebookPixelProvider />;
}
