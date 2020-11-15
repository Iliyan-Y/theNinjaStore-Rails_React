import React from 'react';

const OrderForm = () => {
  return (
    <div>
      <label htmlFor="email">Email *</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
      <label htmlFor="name">Customer Name *</label>
      <input required type="text" name="name" id="name" placeholder="Name" />
      <label htmlFor="address">Delivery address</label>
      <input
        required
        id="address"
        name="address"
        type="text"
        placeholder="Address"
      />
      <label htmlFor="phone">Contact number *</label>
      <input
        required
        type="tel"
        name="phone"
        id="phone"
        placeholder="Phone Number"
      />
      <label htmlFor="postCode">Post Code</label>
      <input
        type="text"
        name="postCode"
        id="postCode"
        placeholder="Post Code"
      />
    </div>
  );
};

export default OrderForm;
