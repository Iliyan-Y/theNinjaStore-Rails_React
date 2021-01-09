import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import OrderDetails from '../AdminPanel/orderDetails';
import { dateToString } from '../../helpers/covertDate';

const UserOrders = () => {
  const [cookies] = useCookies();
  const history = useHistory();
  let [orders, setOrders] = useState([]);
  let [showOrder, setShowOrder] = useState('');

  const fetchOrders = () => {
    axios
      .get('/api/v1/orders/user', {
        headers: { token: cookies.user_token },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    cookies.user_token ? fetchOrders() : history.push('/');
  }, []);

  let displaySelectedOrder = (id) => {
    if (showOrder == '') {
      setShowOrder(id);
    } else setShowOrder('');
  };

  return (
    <Container className="text-center">
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div data-testid="user-order-div" style={innerDiv} key={order.id}>
          <span style={eachOrderSpan}>
            <p
              style={orderInfoP(order.status)}
              onClick={() => displaySelectedOrder(order.id)}
            >
              ↓ Created: {dateToString(order.created_at)} | Number of products:{' '}
              {order.productsId.length} | Status: {order.status} ↓
            </p>
          </span>
          <OrderDetails showOrder={showOrder} order={order} />
          <br />
        </div>
      ))}
    </Container>
  );
};

export default UserOrders;

let orderColorStatus = {
  New: '#d3abed',
  Sent: '#8ab7ff',
  'In progress': '#e6bd65',
  Canceled: '#f76f68',
  Done: '#7be070',
};

let innerDiv = {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
};

let eachOrderSpan = {
  display: 'flex',
  alignSelf: 'center',
  margin: 0,
};

let orderInfoP = (status) => {
  return {
    cursor: 'pointer',
    background: orderColorStatus[status],
    margin: '0 1em 0 0 ',
    padding: '1em',
  };
};
