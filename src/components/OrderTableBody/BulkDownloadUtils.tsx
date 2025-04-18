import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import { Order } from '@/types/order';
import React, { ComponentType } from 'react';

// Utility to generate a PDF Blob for an order (using your invoice components)
export async function generateInvoicePDFBlob(
  order: Order,
  InvoiceHeader: ComponentType<{ details: Order }>,
  InvoiceDetails: ComponentType<{ details: Order }>,
  InvoiceTotal: ComponentType<{ details: Order }>
): Promise<Blob> {
  // Create an offscreen container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.background = 'white';
  container.style.zIndex = '9999';
  container.style.width = '500px';
  document.body.appendChild(container);

  // Render invoice using React 18+ createRoot
  const root = createRoot(container);
  root.render(
    <div className="w-[500px] mx-auto bg-white">
      <div className="mt-10 mb-[30px] pb-8">
        <InvoiceHeader details={order} />
        <InvoiceDetails details={order} />
        <InvoiceTotal details={order} />
      </div>
    </div>
  );

  // Wait for render
  await new Promise(res => setTimeout(res, 300));
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  // Lower scale and image quality for smaller PDF size
  const canvas = await html2canvas(container, { scale: 1.5, useCORS: true, backgroundColor: '#fff' });
  const imgData = canvas.toDataURL('image/jpeg', 0.7); // Use JPEG and lower quality
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  document.body.removeChild(container);
  return pdf.output('blob');
}
