import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ViewAllOrders = () => {
  const [cookies] = useCookies();
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/orders', { headers: { 'token': cookies.user_token } })
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <span key={order.id}>
          <p>{order.customer_name}</p>
          <p>{order.email}</p>
          <p>{order.address}</p>
          <p>{order.post_code}</p>
          <p>{order.phone}</p>
          <p>Products: {order.productsId.length}</p>
          <p>{order.status}</p>
          <p>{order.created_at}</p>
          <br />
        </span>
      ))}
    </div>
  );
};

export default ViewAllOrders;
