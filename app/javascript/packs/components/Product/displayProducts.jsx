import React from 'react';
import { Link } from 'react-router-dom';
import AddToBasket from '../Basket/addToBasketBtn';

const DisplayProducts = ({ products }) => {
  return (
    <div style={outerDiv}>
      {products.map((each) => (
        <span
          style={{
            textAlign: 'center',
            marginBottom: '3em',
          }}
          key={each.id}
        >
          <Link
            style={{ fontFamily: 'Gill Sans, sans-serif' }}
            className="h4"
            to={'/show/product/' + each.id}
          >
            {each.name}
          </Link>
          <p style={{ width: '33vh' }}>{each.description.slice(0, 80)}...</p>
          <img src={each.image} style={{ width: '35vh' }} />
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
