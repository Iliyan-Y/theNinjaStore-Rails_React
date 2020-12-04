import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RemoveItem = ({ itemId, items, setBasket }) => {
  let history = useHistory();
  let dispatch = useDispatch();

  let removeItem = () => {
    let updatedBasket = filterItems();
    updateSession(updatedBasket);
    refreshCounter();
    isBasketEmpty(updatedBasket);
  };

  let filterItems = () => {
    let updatedBasket = [];
    let count = 0;
    items.map((item) => {
      if (item.id == itemId && count == 0) {
        count++;
      } else updatedBasket.push(item);
    });
    return updatedBasket;
  };

  let isBasketEmpty = (updatedBasket) => {
    if (updatedBasket.length == 0) {
      sessionStorage.removeItem('basket');
      history.push('/');
    }
  };

  let updateSession = (updatedBasket) => {
    sessionStorage.setItem('basket', JSON.stringify({ items: updatedBasket }));
    setBasket(JSON.parse(sessionStorage.getItem('basket')));
  };

  let refreshCounter = () => {
    dispatch({
      type: 'REFRESH',
      payload: '',
    });
  };

  return (
    <Button className="btn-danger" onClick={() => removeItem()}>
      X
    </Button>
  );
};

export default RemoveItem;
