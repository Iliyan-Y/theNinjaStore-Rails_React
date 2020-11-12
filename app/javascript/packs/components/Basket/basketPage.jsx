import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const BasketPage = () => {
  let dispatch = useDispatch();
  let items = useSelector((state) => state.basket.items);

  return (
    <div>
      {items.map((each) => (
        <span key={each.id + 'product'}>
          <Link to={'/show/product/' + each.id}>{each.name}</Link>
          <p>{each.description}</p>
          <img src={each.image} alt="" style={{ width: '250px' }} />
          <p>£{each.price}</p>
          <br />
        </span>
      ))}
    </div>
  );
};

export default BasketPage;
