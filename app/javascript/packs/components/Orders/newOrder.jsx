import { func } from 'prop-types';
import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const NewOrder = ({ productsId }) => {
  const [cookies, setCookie] = useCookies();

  let confirmOrder = () => {
    let token = cookies.user_token;
    let body = {
      order: { token, productsId },
    };

    axios
      .post('/api/v1/orders', body)
      .then((res) => console.log(res))
      .catch((err) => console.error(err.message));
  };
  return <button onClick={() => confirmOrder()}>Confirm Order</button>;
};

export default NewOrder;
