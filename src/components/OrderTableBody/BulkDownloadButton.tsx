import React, { useState } from 'react';
import { generateInvoicePDFBlob } from './BulkDownloadUtils';
import InvoiceHeader from '@/components/Invoice/InvoiceHeader';
import InvoiceDetails from '@/components/Invoice/InvoiceDetails';
import InvoiceTotal from '@/components/Invoice/InvoiceTotal';
import { Order } from '@/types/order';
import { FiDownload } from 'react-icons/fi';

import jsPDF from 'jspdf';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Set workerSrc for pdfjs-dist
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface BulkDownloadButtonProps {
  selectedOrders: string[];
  orders: Order[];
}

const BulkDownloadButton: React.FC<BulkDownloadButtonProps> = ({ selectedOrders, orders }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const loadPdf = async (pdfUrl: string) => {
    const loadingTask = getDocument(pdfUrl);
    return await loadingTask.promise;
  };

  const handleBulkDownload = async () => {
    if (!selectedOrders.length) return alert('No orders selected.');
    setIsProcessing(true);
    try {
      const mergedPdf = new jsPDF('p', 'mm', 'a4');
      let pageIndex = 0;
      for (const orderId of selectedOrders) {
        const order = orders.find(o => o._id === orderId);
        if (!order) continue;
        const pdfBlob = await generateInvoicePDFBlob(order, InvoiceHeader, InvoiceDetails, InvoiceTotal);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const pdf = await loadPdf(pdfUrl);
        const numPages = pdf.numPages;
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context!, viewport }).promise;
          const imgData = canvas.toDataURL('image/jpeg', 0.7);
          if (pageIndex > 0) {
            mergedPdf.addPage();
          }
          mergedPdf.addImage(imgData, 'JPEG', 0, 0, mergedPdf.internal.pageSize.getWidth(), mergedPdf.internal.pageSize.getHeight());
          pageIndex++;
        }
      }
      const mergedPdfBlob = mergedPdf.output('blob');
      const pdfUrl = URL.createObjectURL(mergedPdfBlob);
      const printWindow = window.open(pdfUrl, '_blank');
      printWindow?.addEventListener('load', () => {
        printWindow.print();
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div onClick={handleBulkDownload} className="flex items-center justify-center w-full">
      {isProcessing ? (
        <>
          <svg className="animate-spin h-5 w-5 mr-1" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <FiDownload className="mr-1" />
          <span>Download</span>
        </>
      )}
    </div>
  );
};

export default BulkDownloadButton;
