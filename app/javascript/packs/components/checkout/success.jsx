import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const CheckoutSuccess = () => {
  let history = useHistory();

  useEffect(() => {
    sessionStorage.removeItem('basket');
  });

  return (
    <div className="text-center">
      <h1 className="text-success">Thank you for your purchase</h1>
      <Button onClick={() => history.push('/')}>Ok</Button>
    </div>
  );
};

export default CheckoutSuccess;
