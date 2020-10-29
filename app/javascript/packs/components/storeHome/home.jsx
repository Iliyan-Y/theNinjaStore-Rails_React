import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products.all);

  let getFromStore = (data) => {
    data.map((item) => {
      dispatch({
        type: 'GET_PRODUCTS',
        payload: item,
      });
    });
  };

  useEffect(() => {
    axios
      .get('/api/v1/products')
      .then((res) => {
        getFromStore(res.data);
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
