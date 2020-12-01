import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RemoveItem from './removeItem';

const BasketPage = () => {
  let history = useHistory();
  let [basket, setBasket] = useState(
    JSON.parse(sessionStorage.getItem('basket'))
  );

  let calcTotalPrice = () => {
    let total = 0;
    basket.items.map((product) => (total += parseFloat(product.price)));
    return total.toFixed(2);
  };

  if (basket) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignSelf: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {basket.items.map((each) => (
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
                <RemoveItem
                  itemId={each.id}
                  items={basket.items}
                  setBasket={setBasket}
                />
              </div>
            </div>
          ))}
        </span>
        <div
          style={{
            display: 'flex',
            alignSelf: 'center',
            flexDirection: 'column',
          }}
        >
          <h4>Total: {calcTotalPrice()} </h4>
          <Button
            style={{ width: '165px' }}
            onClick={() => history.push('/order')}
          >
            Confirm Order
          </Button>
        </div>
      </div>
    );
  }

  return <div style={{ textAlign: 'center' }}>Basket is empty</div>;
};

export default BasketPage;
