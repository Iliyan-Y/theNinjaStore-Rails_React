import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('/api/v1/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <p>Home Page</p>
      {products.map((each) => (
        <span key={each.id + 'product'}>
          <p>{each.name}</p>
          <p>{each.description}</p>
          <p>£{each.price}</p>
          <img src={each.image} alt="" style={{width:"250px"}}/>
        </span>
      ))}
    </>
  );
};

export default Home;
