// app/bkash_payment/page.tsx
import { Suspense } from 'react';
import Payment2 from '@/components/Payment2'; // Adjust the import path based on your file structure

export const dynamic = 'force-dynamic'; // Prevent static prerendering

const BkashPaymentPage = () => {
  return (
      <Suspense fallback={<div>Loading payment details...</div>}>
        <Payment2 />
      </Suspense>
  );
};

export default BkashPaymentPage;