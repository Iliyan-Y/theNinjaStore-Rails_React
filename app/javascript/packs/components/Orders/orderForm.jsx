import React, { useState } from 'react';
import NewOrder from './newOrder';

const OrderForm = () => {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');
  let [address, setAddress] = useState('');
  let [phone, setPhone] = useState('');
  let [postCode, setPostCode] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '48vh',
        margin: '1em auto',
      }}
    >
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
      <label htmlFor="address">Delivery address</label>
      <input
        required
        id="address"
        name="address"
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
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
      <label htmlFor="postCode">Post Code</label>
      <input
        type="text"
        name="postCode"
        id="postCode"
        placeholder="Post Code"
        onChange={(e) => setPostCode(e.target.value)}
      />
      <NewOrder
        email={email}
        name={name}
        address={address}
        phone={phone}
        postCode={postCode}
      />
    </div>
  );
};

export default OrderForm;
