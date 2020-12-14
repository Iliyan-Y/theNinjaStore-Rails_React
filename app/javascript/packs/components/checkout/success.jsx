import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutSuccess = () => {
  let history = useHistory();
  toast.configure();

  const confirmStatus = () => {
    toast('Your order has been sent');
    sessionStorage.removeItem('basket');
    setTimeout(() => {
      history.push('/');
    }, 2000);
  };

  useEffect(() => confirmStatus(), []);

  return <h1 className="text-center">Thank you for your purches</h1>;
};

export default CheckoutSuccess;
