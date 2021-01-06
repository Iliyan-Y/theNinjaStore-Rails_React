import React, { useState } from 'react';
import NewOrder from './newOrder';

const OrderForm = () => {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');

  return (
    <div data-testid="order-from" style={formStyle}>
      <label htmlFor="email">Email *</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="name">Customer Name *</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="phone">Contact number *</label>
      <input
        required
        type="tel"
        name="phone"
        id="phone"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />
      <NewOrder email={email} name={name} phone={phone} />
    </div>
  );
};

export default OrderForm;

let formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '48vh',
  margin: '1em auto',
};
