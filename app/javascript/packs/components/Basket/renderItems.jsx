import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import RemoveItem from './removeItem';

const RenderItems = ({ items, setBasket }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignSelf: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {items.map((each) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            margin: '0 1em',
          }}
          key={uuid()}
        >
          <Link
            className="h5"
            style={{
              fontFamily: 'Gill Sans, sans-serif',
              maxWidth: '180px',
            }}
            to={'/show/product/' + each.id}
          >
            {each.name}
          </Link>
          <img
            src={each.image}
            alt={each.name}
            style={{ width: '180px', margin: '0.3em 0' }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>£{each.price}</p>
            <RemoveItem itemId={each.id} items={items} setBasket={setBasket} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderItems;
