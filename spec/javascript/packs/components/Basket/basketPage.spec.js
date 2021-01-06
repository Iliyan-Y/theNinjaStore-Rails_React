import React from 'react';
import { renderWithProvider, fakeProdcut } from 'packs/__test__/react_helpers';
import { waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BasketPage from 'packs/components/Basket/basketPage.jsx';

test('Render the default component', () => {
  const { getByText } = renderWithProvider(<BasketPage />);
  getByText('Basket is empty');
});

test('Render the default component with one item', () => {
  window.sessionStorage.setItem(
    'basket',
    JSON.stringify({ items: [fakeProdcut] })
  );
  const { getByTestId } = renderWithProvider(<BasketPage />);
  const div = getByTestId('basket-div');
  expect(div).not.toHaveTextContent('Basket is empty');
  expect(div).toHaveTextContent(fakeProdcut.name);
  expect(div).toHaveTextContent('£' + fakeProdcut.price);
  expect(div).toHaveTextContent('Confirm Order');
});
