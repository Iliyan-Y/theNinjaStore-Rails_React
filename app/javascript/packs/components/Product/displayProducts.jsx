import React from 'react';
import { Link } from 'react-router-dom';
import AddToBasket from '../Basket/addToBasketBtn';

const DisplayProducts = ({ products }) => {
  let summarize = (text, endChar) => {
    return text.slice(0, endChar);
  };

  return (
    <div data-testid="prod" style={outerDiv}>
      {products.map((each) => (
        <span style={innerSpan} key={each.id}>
          <Link
            style={productTitle}
            className="h4"
            to={'/show/product/' + each.id}
          >
            {each.name}
          </Link>
          <p style={{ width: '33vh' }}>{summarize(each.description, 80)}...</p>
          <img src={each.image} style={{ width: '35vh' }} />
          <p>£{each.price}</p>
          <AddToBasket product={each} />
          <br />
        </span>
      ))}
    </div>
  );
};
export default DisplayProducts;

let outerDiv = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  padding: '0.8em',
};

let innerSpan = {
  textAlign: 'center',
  marginBottom: '3em',
};

let productTitle = { fontFamily: 'Gill Sans, sans-serif' };
