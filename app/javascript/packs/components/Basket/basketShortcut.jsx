import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BasketShortcut = () => {
  let items = useSelector((state) => state.basket.items);
  let [numberOfItems, setNumberItems] = useState(0);

  useEffect(() => {
    let itemFromStore = JSON.parse(sessionStorage.getItem('basket'));
    if (itemFromStore) setNumberItems(itemFromStore.items.length);
  }, [items]);

  return (
    <>
      <Link to="/basket">Basket: {numberOfItems}</Link>
    </>
  );
};

export default BasketShortcut;