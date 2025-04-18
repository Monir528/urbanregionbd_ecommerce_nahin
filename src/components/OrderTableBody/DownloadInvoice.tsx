import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import InvoiceHeader from '@/components/Invoice/InvoiceHeader';
import InvoiceDetails from '@/components/Invoice/InvoiceDetails';
import InvoiceTotal from '@/components/Invoice/InvoiceTotal';
import { Order } from '@/types/order';
import { IoMdDownload } from 'react-icons/io';

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
      <button onClick={handleDownload} title="Download Invoice" type="button">
        <IoMdDownload />
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
