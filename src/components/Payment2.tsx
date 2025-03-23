// app/paymentPage/Payment2.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface PaymentResponse {
    message?: string;
    status?: string;
}

const Payment2 = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const division = searchParams.get('division') as string;
    const insertedId = searchParams.get('insertedId') as string;

    const [phone, setPhone] = useState<string>('');
    const [transId, setTransId] = useState<string>('');
    const [successData, setSuccessData] = useState<PaymentResponse | null>(null);

    const payable = division === 'isd' ? '70' : '120';

    const handlePayment = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/editPayment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: insertedId, phone, transId, paid: payable }),
            });
            const data: PaymentResponse = await response.json();
            setSuccessData(data);

            if (typeof window !== 'undefined' && 'fbq' in window) {
                await window.fbq('track', 'ButtonClick');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (successData) {
            router.push('/orderSuccess');
        }
    }, [successData, router]);

    return (
        <div className="m-4">
            <div className="w-full flex flex-wrap flex-col items-center">
                <div className="flex flex-col gap-2 items-center">
                    <Image
                        src="/bkash_logo.png"
                        alt="Bkash Logo"
                        width={128}
                        height={128}
                        className="p-2"
                    />
                    <div className="flex flex-wrap justify-around w-full">
                        <div className="flex flex-col justify-center align-center px-4 border rounded-lg">
                            <div className="flex w-full gap-1">
                                <Image
                                    src="/urbanRegion_Bd.jpg"
                                    alt="Urban Region"
                                    width={48}
                                    height={48}
                                />
                                <p className="font-abc font-semibold text-xl mt-[8px]">Urban Region</p>
                            </div>
                        </div>
                        <div className="p-4 border rounded-lg font-bold font-abc">
                            {division === 'isd' ? 60 : 120} Taka
                        </div>
                    </div>
                    <div className="max-w-[450px] p-4 flex flex-col gap-4 justify-center rounded-md bg-[#d93569c5] divide-y divide-[#c2305e] text-gray-100 text-sm leading-6">
                        <p>
                            ১. <span className="text-yellow-300 font-bold">*247#</span> ডায়েল করে আপনার Bkash
                            মোবাইল মেনু তে যান অথবা BKASH App এ যান।
                        </p>
                        <p>
                            ২. <span className="text-yellow-300 font-bold">Payment</span> এ ক্লিক করুন।
                        </p>
                        <p>
                            ৩. প্রাপক নম্বর হিসেবে লিখুন{' '}
                            <span className="text-yellow-300 font-bold">01858124027</span>
                        </p>
                        <p>৪. ডেলিভারি চার্জ পরিশোধ করে অর্ডার কনফর্ম করুন।</p>
                        <p>৫. সব কিছু ঠিক থাকলে BKASH থেকে একটি বার্তা পাবেন।</p>
                        <p>
                            ৬। আপনার বিকাশ নম্বর ও{' '}
                            <span className="text-yellow-300 font-bold">Transaction ID</span> দিয়ে নিচের ফর্ম
                            পুরন করুন।
                        </p>
                        <p>
                            <input
                                type="text"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                className="w-full text-black text-sm border-0 rounded-md py-[6px] font-bold"
                                placeholder="Bkash নম্বর"
                            />
                            <input
                                type="text"
                                value={transId}
                                onChange={(e) => setTransId(e.target.value)}
                                className="w-full text-black text-sm border-0 rounded-md py-[6px] font-bold mt-2"
                                placeholder="Transaction Id"
                            />
                        </p>
                    </div>
                    <button
                        onClick={handlePayment}
                        className="bg-[#d93569c5] w-full text-white p-2 rounded-md font-semibold"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment2;