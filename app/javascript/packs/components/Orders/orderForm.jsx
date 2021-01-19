import React, { useState, useEffect } from 'react';
import NewOrder from './newOrder';
import { checkForUser } from '../../helpers/checkForUser';
import { useCookies } from 'react-cookie';

const OrderForm = () => {
  let [email, setEmail] = useState('');
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');
  let [isUser, setIsUser] = useState({ user: false });
  const [cookies] = useCookies();

  useEffect(() => {
    checkForUser(cookies.user_token, setIsUser);
  }, []);

  return (
    <div data-testid="order-from" style={formStyle}>
      <label style={emailStyle(isUser)} htmlFor="email">
        Email *
      </label>
      <input
        style={{
          ...emailStyle(isUser),
          ...inputStyle(email, 5),
        }}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="name">Customer Name *</label>
      <input
        style={inputStyle(name, 3)}
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
        style={inputStyle(phone, 5)}
        type="tel"
        name="phone"
        id="phone"
        placeholder="Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />
      <NewOrder
        email={email}
        name={name}
        phone={phone}
        token={cookies.user_token}
      />
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
let emailStyle = (isUser) => {
  return {
    display: isUser.user ? 'none' : 'block',
  };
};

let inputStyle = (input, minLength) => {
  let style = {
    error: { border: '2px solid red' },
    default: { border: '1px solid grey' },
  };

  if (input.length == 0) return style.default;

  if (input.length < minLength) return style.error;

  return style.default;
};
