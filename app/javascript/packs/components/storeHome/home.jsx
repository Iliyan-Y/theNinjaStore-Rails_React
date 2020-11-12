import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DisplayProducts from '../Product/displayProducts';

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products.all);

  let setProducts = (data) => {
    data.map((item) => {
      dispatch({
        type: 'SET_PRODUCTS',
        payload: item,
      });
    });
  };

  useEffect(() => {
    axios
      .get('/api/v1/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err.message));

    return () =>
      dispatch({
        type: 'CLEAR_PRODUCTS',
        payload: '',
      });
  }, []);

  return (
    <>
      <DisplayProducts products={products} />
    </>
  );
};

export default Home;
