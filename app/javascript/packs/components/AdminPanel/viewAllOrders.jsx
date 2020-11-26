import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UpdateOrderStatus from './updateOrderStatus';
import OrderDetails from './orderDetails';

const ViewAllOrders = () => {
  let refresh = useSelector((state) => state.general.refresh);
  let history = useHistory();
  const [cookies] = useCookies();
  let [orders, setOrders] = useState([]);
  let [showOrder, setShowOrder] = useState('');

  useEffect(() => {
    axios
      .get('/api/v1/orders', { headers: { 'token': cookies.user_token } })
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => history.push('/'));
  }, [refresh]);

  let displaySelectedOrder = (id) => {
    if (showOrder == '') {
      setShowOrder(id);
    } else setShowOrder('');
  };

  let orderColorStatus = {
    'New': '#d3abed',
    'Sent': '#8ab7ff',
    'In progress': '#e6bd65',
    'Canceled': '#f76f68',
    'Done': '#7be070',
  };

  return (
    <div style={{ marginTop: '1em' }}>
      {orders.map((order) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
          }}
          key={order.id}
        >
          <span
            style={{
              display: 'flex',
              alignSelf: 'center',
              margin: 0,
            }}
          >
            <p
              style={{
                cursor: 'pointer',
                background: orderColorStatus[order.status],
                margin: '0 1em 0 0 ',
              }}
              onClick={() => displaySelectedOrder(order.id)}
            >
              Status: {order.status} Customer name: {order.customer_name}
            </p>
            <UpdateOrderStatus
              token={cookies.user_token}
              orderId={order.id}
              currentStatus={order.status}
            />
          </span>
          <OrderDetails showOrder={showOrder} order={order} />
          <br />
        </div>
      ))}
    </div>
  );
};

export default ViewAllOrders;
