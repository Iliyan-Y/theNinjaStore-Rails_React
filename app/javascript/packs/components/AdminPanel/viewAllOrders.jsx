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
  let [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/orders', { headers: { 'token': cookies.user_token } })
      .then((res) => {
        setOrders(res.data);
      })
      .catch(() => history.push('/'));
  }, [refresh]);

  let displayProducts = (productsId) => {
    if (products.length == 0) {
      axios
        .post('/api/v1/orders/products', { order: { productsId } })
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err.message));
    } else setProducts([]);
  };

  return (
    <div>
      {orders.map((order) => (
        <span key={order.id}>
          <p>{order.customer_name}</p>
          <p>{order.email}</p>
          <p>{order.address}</p>
          <p>{order.post_code}</p>
          <p>{order.phone}</p>
          <button onClick={() => displayProducts(order.productsId)}>
            Products: {order.productsId.length}
          </button>
          <p>{order.status}</p>
          <UpdateOrderStatus token={cookies.user_token} orderId={order.id} />
          <p>{order.created_at}</p>
          <br />
        </span>
      ))}
      <ViewOrderProducts products={products} />
    </div>
  );
};

export default ViewAllOrders;
