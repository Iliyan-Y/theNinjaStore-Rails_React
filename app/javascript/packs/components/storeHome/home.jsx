import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const Home = () => {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products.all);
  const [cookies, setCookie, removeCookie] = useCookies();

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
      .catch((err) => console.error(err.message));

    return () =>
      dispatch({
        type: 'CLEAR_PRODUCTS',
        payload: '',
      });
  }, []);

  return (
    <>
      {cookies.user_token == undefined ? (
        <div>
          <Link to="/register">Sign Up</Link> | <Link to="/log-in">Log In</Link>
        </div>
      ) : (
        <div>
          <Link to="/new/product">New Product</Link> |
          <a href="/" onClick={() => removeCookie('user_token')}>
            Log Out
          </a>
        </div>
      )}

      <p>Home Page</p>
      {products.map((each) => (
        <span key={each.id + 'product'}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
          <p>£{each.price}</p>
        </span>
      ))}
    </>
  );
};

export default Home;
