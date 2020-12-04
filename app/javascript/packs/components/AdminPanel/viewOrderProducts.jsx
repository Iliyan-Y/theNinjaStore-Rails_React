import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

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
      <Button style={displayBtn} onClick={() => displayProducts()}>
        Products: {productsId.length}
      </Button>
      <div style={outerDiv}>
        {products.map((each) => (
          <span style={productSpan} key={uuid()}>
            <Link to={'/show/product/' + each.id}>{each.name}</Link>
            <img
              src={each.image}
              alt="product image"
              style={{ width: '150px' }}
            />
            <p>£{each.price}</p>
          </span>
        ))}
      </div>
    </>
  );
};

export default ViewOrderProducts;

let productSpan = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  margin: '0.5em',
};

let displayBtn = { width: '150px', margin: '0 auto' };

let outerDiv = { display: 'flex', flexWrap: 'wrap' };
