import React, { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceModal = ({ showModal, closeModal, invoiceData }) => {
  const invoiceRef = useRef();

  const downloadPDF = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  return (
    <Modal show={showModal} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Invoice Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div ref={invoiceRef} className="p-3 bg-light">
          <h3>Invoice</h3>
          <p><strong>Bill To:</strong> {invoiceData.customerName}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {invoiceData.items.map(item => (
              <li key={item.id}>{item.name} x{item.quantity} - {invoiceData.currency} {item.price}</li>
            ))}
          </ul>
          <p><strong>Total:</strong> {invoiceData.currency} {invoiceData.total.toFixed(2)}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>Close</Button>
        <Button variant="primary" onClick={downloadPDF}>Download PDF</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
