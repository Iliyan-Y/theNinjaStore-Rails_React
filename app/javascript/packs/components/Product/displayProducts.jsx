import React from 'react';
import { Link } from 'react-router-dom';

const DisplayProducts = ({ products }) => {
  return (
    <div>
      {products.map((each) => (
        <span key={each.id + 'product'}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
          <p>£{each.price}</p>
          <button>Add to basket</button>
          <br />
        </span>
      ))}
    </div>
  );
};

export default DisplayProducts;
