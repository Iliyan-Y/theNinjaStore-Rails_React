import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const CheckoutCancel = () => {
  let history = useHistory();
  return (
    <div className="text-center">
      <h1 className="text-danger">Order unsuccessful, please try again</h1>
      <Button onClick={() => history.push('/')}>Ok</Button>
    </div>
  );
};

export default CheckoutCancel;
