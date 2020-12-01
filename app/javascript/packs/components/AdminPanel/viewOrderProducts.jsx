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
      <Button
        style={{ width: '150px', margin: '0 auto' }}
        onClick={() => displayProducts()}
      >
        Products: {productsId.length}
      </Button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((each) => (
          <span
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              margin: '0.5em',
            }}
            key={uuid()}
          >
            <Link to={'/show/product/' + each.id}>{each.name}</Link>
            <img src={each.image} alt="" style={{ width: '150px' }} />
            <p>£{each.price}</p>
          </span>
        ))}
      </div>
    </>
  );
};

export default ViewOrderProducts;
