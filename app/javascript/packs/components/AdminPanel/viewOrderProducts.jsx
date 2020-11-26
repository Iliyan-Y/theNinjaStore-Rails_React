import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ViewOrderProducts = ({ productsId }) => {
  let [products, setProducts] = useState([]);

  let displayProducts = () => {
    if (products.length == 0) {
      axios
        .post('/api/v1/orders/products', { order: { productsId } })
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err.message));
    } else setProducts([]);
  };

  return (
    <>
      <button onClick={() => displayProducts()}>
        Products: {productsId.length}
      </button>
      {products.map((each) => (
        <span key={uuid()}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
          <p>£{each.price}</p>
          <br />
        </span>
      ))}
    </>
  );
};

export default ViewOrderProducts;
