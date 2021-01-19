import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { validateOrderForm } from '../../helpers/formValidators';
const stripePromise = loadStripe(
  'pk_test_51HxwzUFr1fOlo3WtjiUKn9CcA3UkYmgYf4EkQ9GBbb8Qk3NCOkLc6htsEoyLV2IG989T7uCkdGfwMUJQszUcHeLq00ZbXFjQum'
);
const NewOrder = ({ name, email, phone, token, user }) => {
  let [basket, setBasket] = useState(
    JSON.parse(sessionStorage.getItem('basket'))
  );

  let placeOrder = () => {
    if (validateOrderForm(name, email, phone, user)) {
      let body = createFormBody();
      sendToApi(body);
    }
  };

  let getItemsId = () => {
    let productsId = basket.items.map((item) => item.id);
    return productsId;
  };

  let createFormBody = () => {
    return {
      order: {
        email,
        customer_name: name,
        phone,
        productsId: getItemsId(),
        number_of_items: getItemsId().length,
      },
    };
  };

  let sendToApi = async (body) => {
    let headers = {
      headers: {
        token,
      },
    };
    const stripe = await stripePromise;
    axios
      .post('/api/v1/orders', body, headers)
      .then(async (res) => await stripe.redirectToCheckout(res.data))
      .catch((err) => {
        alert('Something went wrong, please check all fields and try again');
        console.error(err.message);
      });
  };

  return (
    <Button className="mt-2" onClick={() => placeOrder()}>
      Place Order
    </Button>
  );
};

export default NewOrder;
