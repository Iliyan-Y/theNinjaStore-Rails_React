import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

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

  return (
    <Button
      style={{ width: '165px', margin: '0 auto' }}
      onClick={() => addItem(product)}
    >
      Add to basket
    </Button>
  );
};

export default AddToBasket;
