import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BasketShortcut = () => {
  let refresh = useSelector((state) => state.general.refresh);
  let items = useSelector((state) => state.basket.items);
  let [numberOfItems, setNumberItems] = useState(0);

  useEffect(() => {
    let itemFromStore = JSON.parse(sessionStorage.getItem('basket'));
    itemFromStore
      ? setNumberItems(itemFromStore.items.length)
      : setNumberItems(0);
  }, [items, refresh]);

  return (
    <Link className="nav-link" to="/basket">
      Basket: {numberOfItems}
    </Link>
  );
};

export default BasketShortcut;
