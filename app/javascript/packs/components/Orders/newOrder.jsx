import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  'pk_test_51HxwzUFr1fOlo3WtjiUKn9CcA3UkYmgYf4EkQ9GBbb8Qk3NCOkLc6htsEoyLV2IG989T7uCkdGfwMUJQszUcHeLq00ZbXFjQum'
);
const NewOrder = ({ name, email, postCode, phone, address }) => {
  const [cookies] = useCookies();
  let [basket, setBasket] = useState(
    JSON.parse(sessionStorage.getItem('basket'))
  );

  let placeOrder = () => {
    let body = createFormBody();
    sendToApi(body);
  };

  let getItemsId = () => {
    let productsId = basket.items.map((item) => item.id);
    return productsId;
  };

  let calcTotalPrice = () => {
    let total = 0;
    basket.items.map((product) => (total += parseFloat(product.price)));
    return total.toFixed(2);
  };

  let createFormBody = () => {
    return {
      order: {
        email,
        customer_name: name,
        address,
        phone,
        post_code: postCode,
        productsId: getItemsId(),
        number_of_items: getItemsId().length,
        total_price: calcTotalPrice(),
      },
    };
  };

  let sendToApi = async (body) => {
    let headers = {
      headers: {
        token: cookies.user_token,
      },
    };
    const stripe = await stripePromise;
    axios
      .post('/api/v1/orders', body, headers)
      .then(async (res) => await stripe.redirectToCheckout(res.data))
      .catch((err) => console.error(err.message));
  };

  return (
    <Button className="mt-2" onClick={() => placeOrder()}>
      Place Order
    </Button>
  );
};

export default NewOrder;
