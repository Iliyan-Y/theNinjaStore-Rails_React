import React from 'react';
import { Link } from 'react-router-dom';
import AddToBasket from '../Basket/addToBasketBtn';

const DisplayProducts = ({ products }) => {
  return (
    <div style={outerDiv}>
      {products.map((each) => (
        <span key={each.id}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} style={{ width: '260px' }} />
          <p>£{each.price}</p>
          <AddToBasket product={each} />
          <br />
        </span>
      ))}
    </div>
  );
};

let outerDiv = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '0.8em',
};

export default DisplayProducts;
