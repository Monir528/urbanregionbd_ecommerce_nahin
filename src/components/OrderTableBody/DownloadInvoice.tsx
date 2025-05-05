import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceHeader from '@/components/Invoice/InvoiceHeader';
import InvoiceDetails from '@/components/Invoice/InvoiceDetails';
import InvoiceTotal from '@/components/Invoice/InvoiceTotal';
import { Order } from '@/types/order';

interface DownloadInvoiceProps {
  order: Order;
}

const DownloadInvoice: React.FC<DownloadInvoiceProps> = ({ order }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!invoiceRef.current) return;
    // Wait for custom fonts to load
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    // Make the invoice visible for screenshot
    invoiceRef.current.style.display = 'block';
    // Give the browser a moment to render styles
    await new Promise(res => setTimeout(res, 200));
    const canvas = await html2canvas(invoiceRef.current, { scale: 3, useCORS: true, backgroundColor: '#fff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${order._id}.pdf`);
    // Hide the invoice after screenshot
    invoiceRef.current.style.display = 'none';
  };

  return (
    <>
      <button onClick={handleDownload} className="flex items-center justify-center rounded-full bg-gray-200 text-gray-700 p-2 hover:bg-gray-300 transition-colors" title="Download Invoice" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
      </button>
      {/* Hidden printable invoice */}
      <div
        ref={invoiceRef}
        className="print-invoice"
        style={{ display: 'none', position: 'fixed', left: '-9999px', top: 0, background: 'white', zIndex: 9999 }}
      >
        <div className="w-[500px] mx-auto bg-white">
          <div className="mt-10 mb-[30px] pb-8">
            <InvoiceHeader details={order} />
            <InvoiceDetails details={order} />
            <InvoiceTotal details={order} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadInvoice;
