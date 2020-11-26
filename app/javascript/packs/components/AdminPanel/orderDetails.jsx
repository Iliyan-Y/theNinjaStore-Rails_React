import React from 'react';
import ViewOrderProducts from './viewOrderProducts';

const OrderDetails = ({ order, showOrder }) => {
  return (
    <span
      style={{
        display: showOrder == order.id ? 'flex' : 'none',
        flexDirection: 'column',
        alignSelf: 'center',
      }}
    >
      <p>{order.created_at}</p>
      <p>{order.email}</p>
      <p>{order.address}</p>
      <p>{order.post_code}</p>
      <p>{order.phone}</p>
      <ViewOrderProducts productsId={order.productsId} />
    </span>
  );
};

export default OrderDetails;
