import React from 'react';
import { Link } from 'react-router-dom';
import AddToBasket from '../Basket/addToBasketBtn';

const DisplayProducts = ({ products }) => {
  return (
    <div>
      {products.map((each) => (
        <span key={each.id}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
          <p>£{each.price}</p>
          <AddToBasket product={each} />
          <br />
        </span>
      ))}
    </div>
  );
};

export default DisplayProducts;
