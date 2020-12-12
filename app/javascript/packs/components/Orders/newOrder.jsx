import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const NewOrder = ({ name, email, postCode, phone, address }) => {
  let history = useHistory();
  const [cookies] = useCookies();
  toast.configure();

  let placeOrder = () => {
    let body = createFormBody(getItemsId());
    sendToApi(body);
  };

  let getItemsId = () => {
    let basket = JSON.parse(sessionStorage.getItem('basket'));
    let productsId = basket.items.map((item) => item.id);
    return productsId;
  };

  let createFormBody = (productsId) => {
    return {
      order: {
        email,
        customer_name: name,
        address,
        phone,
        post_code: postCode,
        productsId,
      },
    };
  };

  let sendToApi = (body) => {
    let headers = {
      headers: {
        'token': cookies.user_token,
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
