import React from 'react';
import { renderWithProvider, fakeProdcut } from 'packs/__test__/react_helpers';
import { waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddToBasket from 'packs/components/Basket/addToBasketBtn.jsx';
import BasketShortcut from 'packs/components/Basket/basketShortcut.jsx';

test('render the default component', () => {
  const { getByText } = renderWithProvider(
    <AddToBasket prodcut={fakeProdcut} />
  );

  getByText('Add to basket');
});

test('add to basket changes the basket content', async () => {
  const { getByText } = renderWithProvider(
    <>
      <AddToBasket prodcut={fakeProdcut} /> <BasketShortcut />
    </>
  );
  let btn = getByText('Add to basket');
  fireEvent.click(btn);
  const basket = await waitFor(() => getByText(/Basket: /));
  expect(basket).toHaveTextContent('1');
  expect(basket).not.toHaveTextContent('Basket: 0');
});
