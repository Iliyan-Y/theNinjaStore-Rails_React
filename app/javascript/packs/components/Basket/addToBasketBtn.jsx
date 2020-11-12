import React from 'react';
import { useDispatch } from 'react-redux';

const AddToBasket = ({ product }) => {
  let dispatch = useDispatch();

  let addItem = (product) => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: product,
    });
  };

  return <button onClick={() => addItem(product)}>Add to basket</button>;
};

export default AddToBasket;
