import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const BasketPage = () => {
  const [cookies] = useCookies();
  let history = useHistory();
  let basket = JSON.parse(sessionStorage.getItem('basket'));

  if (cookies.user_token == undefined)
    return <h3>Please Log in to be able see the basket</h3>;

  if (basket) {
    let productsId = basket.items.map((item) => item.id);
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
