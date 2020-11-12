import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const BasketShortcut = () => {
  let items = useSelector((state) => state.basket.items);
  let [numberOfItems, setNumberItems] = useState(0);

  useEffect(() => {
    setNumberItems(items.length);
  }, [items]);

  return (
    <>
      <p>Basket: {numberOfItems}</p>
    </>
  );
};

export default BasketShortcut;
