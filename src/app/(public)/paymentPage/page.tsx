// app/paymentPage/page.tsx
import { Suspense } from 'react';
import Payment2 from '@/components/Payment2'; // Adjust the import path based on your file structure

export const dynamic = 'force-dynamic'; // Prevent static prerendering

const PaymentPage = () => {
  return (
      <Suspense fallback={<div>Loading payment details...</div>}>
        <Payment2 />
      </Suspense>
  );
};

export default PaymentPage;