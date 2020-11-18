import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

const ViewOrderProducts = ({ products }) => {
  return (
    <div>
      {products.map((each) => (
        <span key={uuid()}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
          <p>£{each.price}</p>
          <br />
        </span>
      ))}
    </div>
  );
};

export default ViewOrderProducts;
