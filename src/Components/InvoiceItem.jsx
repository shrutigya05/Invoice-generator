import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EditableField from './EditableField';
import { MdDelete } from 'react-icons/md';

const InvoiceItem = ({ items, onItemizedItemEdit, onRowAdd, onRowDel, currency }) => (
  <>
    <Table className="text-center" responsive>
      <thead>
        <tr>
          <th className="fw-bold">Item</th>
          <th className="fw-bold">Description</th>
          <th className="fw-bold">Price</th>
          <th className="fw-bold">Quantity</th>
          <th className="fw-bold">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td><EditableField onItemizedItemEdit={onItemizedItemEdit} cellData={{ ...item, name: 'name' }} /></td>
            <td><EditableField onItemizedItemEdit={onItemizedItemEdit} cellData={{ ...item, name: 'description' }} /></td>
            <td><EditableField onItemizedItemEdit={onItemizedItemEdit} cellData={{ ...item, name: 'price' }} /></td>
            <td><EditableField onItemizedItemEdit={onItemizedItemEdit} cellData={{ ...item, name: 'quantity' }} /></td>
            <td><Button variant="danger" onClick={() => onRowDel(item)}><MdDelete /></Button></td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Button variant="primary" onClick={onRowAdd}>Add Item</Button>
  </>
);

export default InvoiceItem;