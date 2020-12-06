import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewOrder = ({ name, email, postCode, phone, address }) => {
  let history = useHistory();
  toast.configure();

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
      .then((res) => {
        toast('Your order has been sent');
        sessionStorage.removeItem('basket');

        setTimeout(() => {
          history.push('/');
        }, 3000);
      })
      .catch((err) => console.error(err.message));
  };
  return (
    <Button className="mt-2" onClick={() => placeOrder()}>
      Place Order
    </Button>
  );
};

export default NewOrder;
