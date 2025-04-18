import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateInvoicePDFBlob } from './BulkDownloadUtils';
import InvoiceHeader from '@/components/Invoice/InvoiceHeader';
import InvoiceDetails from '@/components/Invoice/InvoiceDetails';
import InvoiceTotal from '@/components/Invoice/InvoiceTotal';
import { Order } from '@/types/order';
import { FiDownload } from 'react-icons/fi';

interface BulkDownloadButtonProps {
  selectedOrders: string[];
  orders: Order[];
}

function getUniqueZipName() {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `invoices_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.zip`;
}

const BulkDownloadButton: React.FC<BulkDownloadButtonProps> = ({ selectedOrders, orders }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkDownload = async () => {
    if (!selectedOrders.length) return alert('No orders selected.');
    setIsProcessing(true);
    try {
      const zip = new JSZip();
      for (const orderId of selectedOrders) {
        const order = orders.find(o => o._id === orderId);
        if (!order) continue;
        const pdfBlob = await generateInvoicePDFBlob(order, InvoiceHeader, InvoiceDetails, InvoiceTotal);
        zip.file(`invoice-${orderId}.pdf`, pdfBlob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, getUniqueZipName());
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleBulkDownload}
      disabled={!selectedOrders.length || isProcessing}
      className={`bg-indigo-600 text-white rounded-full p-2 flex items-center justify-center text-xl transition ${isProcessing ? 'opacity-60 cursor-not-allowed' : ''}`}
      title="Download Selected"
    >
      {isProcessing ? (
        <span className="flex items-center gap-1">
          <svg className="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="sr-only">Processing...</span>
        </span>
      ) : (
        <FiDownload />
      )}
    </button>
  );
};

export default BulkDownloadButton;
