import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';

const BasketPage = () => {
  let history = useHistory();
  let basket = JSON.parse(sessionStorage.getItem('basket'));

  if (basket) {
    return (
      <div>
        {basket.items.map((each) => (
          <span key={uuid()}>
            <Link to={'/show/product/' + each.id}>{each.name}</Link>
            <p>{each.description}</p>
            <img src={each.image} alt="" style={{ width: '250px' }} />
            <p>£{each.price}</p>
            <br />
          </span>
        ))}
        <button onClick={() => history.push('/order')}>Confirm Order</button>
      </div>
    );
  }

  return <div>Basket is empty</div>;
};

export default BasketPage;
