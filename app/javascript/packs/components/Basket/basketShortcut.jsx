import React, { useState } from 'react';

const BasketShortcut = () => {
  let [numberOfItems, setNumberItems] = useState(0);

  return (
    <>
      <p>Basket: {numberOfItems}</p>
    </>
  );
};

export default BasketShortcut;
