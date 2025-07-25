// src/components/InvoiceForm.jsx
import React, { useState } from 'react';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';

const InvoiceForm = () => {
  const [items, setItems] = useState([
    { id: uuidv4(), name: '', description: '', price: '', quantity: 1 }
  ]);

  const [currency, setCurrency] = useState('$');
  const [customerName, setCustomerName] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleItemChange = (e) => {
    const updatedItems = items.map(item =>
      item.id === e.target.id
        ? { ...item, [e.target.name]: e.target.value }
        : item
    );
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { id: uuidv4(), name: '', description: '', price: '', quantity: 1 }]);
  };

  const handleDeleteItem = (itemToRemove) => {
    setItems(items.filter(item => item.id !== itemToRemove.id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => (
      total + parseFloat(item.price || 0) * parseInt(item.quantity || 1)
    ), 0);
  };

  return (
    <Form>
      {/* Bill From */}
      <h5>Bill From</h5>
      <Form.Group className="mb-2">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={fromName} onChange={e => setFromName(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={fromEmail} onChange={e => setFromEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={2} value={fromAddress} onChange={e => setFromAddress(e.target.value)} />
      </Form.Group>

      {/* Bill To */}
      <h5>Bill To</h5>
      <Form.Group className="mb-3">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          required
        />
      </Form.Group>

      {/* Item Table */}
      <InvoiceItem
        items={items}
        onItemizedItemEdit={handleItemChange}
        onRowAdd={handleAddItem}
        onRowDel={handleDeleteItem}
        currency={currency}
      />

      {/* Currency Selection */}
      <Form.Group className="my-3">
        <Form.Label>Select Currency</Form.Label>
        <Form.Select value={currency} onChange={e => setCurrency(e.target.value)}>
          <option value="$">USD ($)</option>
          <option value="₹">INR (₹)</option>
          <option value="€">Euro (€)</option>
        </Form.Select>
      </Form.Group>

      {/* Total & Preview Button */}
      <h5 className="mt-3">Total: {currency} {calculateTotal().toFixed(2)}</h5>

      <Button
        className="mt-3"
        variant="success"
        onClick={() => setShowModal(true)}
      >
        Preview Invoice
      </Button>

      <InvoiceModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        invoiceData={{
          customerName,
          items,
          total: calculateTotal(),
          currency,
          from: {
            name: fromName,
            email: fromEmail,
            address: fromAddress
          }
        }}
      />
    </Form>
  );
};

export default InvoiceForm;
