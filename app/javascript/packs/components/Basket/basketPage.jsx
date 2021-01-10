import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RenderItems from './renderItems';

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

  if (basket && basket.items.length > 0) {
    return (
      <div data-testid="basket-div" style={outerDiv}>
        <RenderItems items={basket.items} setBasket={setBasket} />
        <div style={bottomDiv}>
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

let outerDiv = {
  display: 'flex',
  flexDirection: 'column',
};

let bottomDiv = {
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
};
