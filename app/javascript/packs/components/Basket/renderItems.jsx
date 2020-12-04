import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import RemoveItem from './removeItem';

const RenderItems = ({ items, setBasket }) => {
  return (
    <div style={outerDiv}>
      {items.map((each) => (
        <div style={innerDiv} key={uuid()}>
          <Link
            className="h5"
            style={productTitle}
            to={'/show/product/' + each.id}
          >
            {each.name}
          </Link>
          <img src={each.image} alt={each.name} style={coverPhoto} />
          <div style={bottomInnerDiv}>
            <p>£{each.price}</p>
            <RemoveItem itemId={each.id} items={items} setBasket={setBasket} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderItems;

let outerDiv = {
  display: 'flex',
  alignSelf: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

let innerDiv = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  margin: '0 1em',
};

let productTitle = {
  fontFamily: 'Gill Sans, sans-serif',
  maxWidth: '180px',
};

let bottomInnerDiv = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

let coverPhoto = { width: '180px', margin: '0.3em 0' };
