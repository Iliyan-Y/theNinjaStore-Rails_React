import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const NewOrder = ({ name, email, postCode, phone, address }) => {
  let history = useHistory();

  let placeOrder = () => {
    let basket = JSON.parse(sessionStorage.getItem('basket'));
    let productsId = basket.items.map((item) => item.id);
    let body = {
      order: {
        email,
        customer_name: name,
        address,
        phone,
        post_code: postCode,
        productsId,
      },
    };

    axios
      .post('/api/v1/orders', body)
      .then(() => {
        sessionStorage.removeItem('basket'), history.push('/');
      })
      .catch((err) => console.error(err.message));
  };
  return <button onClick={() => placeOrder()}>Place Order</button>;
};

export default NewOrder;
