import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const NewOrder = ({ productsId }) => {
  const [cookies] = useCookies();
  let history = useHistory();

  let placeOrder = () => {
    let token = cookies.user_token;
    let body = {
      order: { token, productsId },
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
