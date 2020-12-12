import React from 'react';
import ViewOrderProducts from './viewOrderProducts';
import { dateTimeString } from '../../helpers/covertDate';

const OrderDetails = ({ order, showOrder }) => {
  return (
    <span
      style={{
        display: showOrder == order.id ? 'flex' : 'none',
        flexDirection: 'column',
        alignSelf: 'center',
        textAlign: 'center',
      }}
    >
      <p>Created at: {dateTimeString(order.created_at)}</p>
      <p>{order.email}</p>
      <p>{order.address}</p>
      <p>{order.post_code}</p>
      <p>{order.phone}</p>
      <ViewOrderProducts productsId={order.productsId} />
    </span>
  );
};

export default OrderDetails;
