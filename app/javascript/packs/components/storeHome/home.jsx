import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products.all);

  let addToStore = (data) => {
    data.map((each) => {
      dispatch({
        type: 'GET_PRODUCTS',
        payload: each,
      });
    });
  };

  useEffect(() => {
    axios
      .get('/api/v1/products')
      .then((res) => {
        addToStore(res.data);
      })
      .catch((err) => console.log(err.message));

    return () =>
      dispatch({
        type: 'CLEAR_PRODUCTS',
        payload: '',
      });
  }, []);

  return (
    <>
      <p>Home Page</p>
      {products.map((each) => (
        <span key={each.id + 'product'}>
          <Link to="/show/product">Product</Link>
          <p>{each.name}</p>
          <p>{each.description}</p>
          <p>£{each.price}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
        </span>
      ))}
    </>
  );
};

export default Home;
