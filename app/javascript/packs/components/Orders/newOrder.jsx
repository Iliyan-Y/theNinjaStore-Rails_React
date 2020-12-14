import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(
  'pk_test_51HxwzUFr1fOlo3WtjiUKn9CcA3UkYmgYf4EkQ9GBbb8Qk3NCOkLc6htsEoyLV2IG989T7uCkdGfwMUJQszUcHeLq00ZbXFjQum'
);
const NewOrder = ({ name, email, postCode, phone, address }) => {
  let history = useHistory();
  const [cookies] = useCookies();
  let [basket, setBasket] = useState(
    JSON.parse(sessionStorage.getItem('basket'))
  );
  toast.configure();

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

  let sendToApi = (body) => {
    let headers = {
      headers: {
        token: cookies.user_token,
      },
    };
    axios
      .post('/api/v1/orders', body, headers)
      .then(() => confirmStatus())
      .catch((err) => console.error(err.message));
  };

  let confirmStatus = () => {
    toast('Your order has been sent');
    sessionStorage.removeItem('basket');
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  return (
    <Button className="mt-2" onClick={() => placeOrder()}>
      Place Order
    </Button>
  );
};

export default NewOrder;
