import React from 'react';
import { renderWithProvider, fakeProdcut } from 'packs/__test__/react_helpers';
import BasketShortcut from 'packs/components/Basket/basketShortcut.jsx';

test('Render the component', () => {
  renderWithProvider(<BasketShortcut />);
});

test('render with default value', () => {
  const { getByText } = renderWithProvider(<BasketShortcut />);
  getByText(/Basket: 0/);
});

test('render with one product in the basket', () => {
  window.sessionStorage.setItem(
    'basket',
    JSON.stringify({ items: [fakeProdcut] })
  );

  const { getByText } = renderWithProvider(<BasketShortcut />);
  getByText(/Basket: 1/);
});
