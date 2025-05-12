'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initFacebookPixel, events } from '@/utils/facebookPixel';

export default function FacebookPixelProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize Facebook Pixel on component mount
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
      import('react-facebook-pixel')
        .then((mod) => mod.default)
        .then((ReactPixel) => {
          ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID!, null, {
            autoConfig: true,
            debug: process.env.NODE_ENV === 'development',
          });
          ReactPixel.pageView();
        });
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID) {
      events.pageView();
    }
  }, [pathname, searchParams]);

  return null;
}
