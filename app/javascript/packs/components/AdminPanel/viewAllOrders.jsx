import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ViewOrderProducts from './viewOrderProducts';
import UpdateOrderStatus from './updateOrderStatus';

const ViewAllOrders = () => {
  let refresh = useSelector((state) => state.general.refresh);
  let history = useHistory();
  const [cookies] = useCookies();
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/orders', { headers: { 'token': cookies.user_token } })
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => history.push('/'));
  }, [refresh]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {orders.map((order) => (
        <span key={order.id}>
          <span
            style={{
              display: 'flex',
              margin: '0.5em',
            }}
          >
            <p style={{ marginRight: '1em' }}>Status: {order.status}</p>
            <p>Customer name: {order.customer_name}</p>
            <UpdateOrderStatus token={cookies.user_token} orderId={order.id} />
          </span>
          <span>
            <p>{order.created_at}</p>
            <p>{order.email}</p>
            <p>{order.address}</p>
            <p>{order.post_code}</p>
            <p>{order.phone}</p>
            <ViewOrderProducts productsId={order.productsId} />
          </span>
          <br />
        </span>
      ))}
    </div>
  );
};

export default ViewAllOrders;
