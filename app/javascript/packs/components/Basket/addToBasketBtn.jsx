import React from 'react';
import { useDispatch } from 'react-redux';

const AddToBasket = ({ product }) => {
  let dispatch = useDispatch();

  let addItem = (product) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product,
    });
    updateSession(product);
  };

  let updateSession = (product) => {
    let getCurrent = JSON.parse(sessionStorage.getItem('basket'));
    let newState = {
      items: getCurrent ? [...getCurrent.items, product] : [product],
    };
    sessionStorage.setItem('basket', JSON.stringify(newState));
  };

  return <button onClick={() => addItem(product)}>Add to basket</button>;
};

export default AddToBasket;
