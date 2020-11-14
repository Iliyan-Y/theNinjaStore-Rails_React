import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import NewOrder from '../Orders/newOrder';
import { useState } from 'react';

const BasketPage = () => {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
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
      <NewOrder productsId={productsId} />
    </div>
  );
};

export default BasketPage;
