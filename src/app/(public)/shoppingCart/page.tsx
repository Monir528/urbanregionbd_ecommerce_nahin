'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the client component with SSR disabled
const ShoppingCartClient = dynamic(
  () => import('./ShoppingCartClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }
);

// This is a server component that renders the client component
export default function ShoppingCartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <ShoppingCartClient />
    </Suspense>
  );
}