import React from 'react';
import {
  renderWithProvider,
  fakeProduct,
  fakeProductState,
} from 'packs/__test__/react_helpers';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BasketPage from 'packs/components/Basket/basketPage.jsx';
import NewOrder from 'packs/components/Orders/orderForm';

test('Render the default component', () => {
  const { getByText } = renderWithProvider(<BasketPage />);
  getByText('Basket is empty');
});

test('Render the default component with one item', () => {
  window.sessionStorage.setItem(
    'basket',
    JSON.stringify({ items: [fakeProduct] })
  );
  const { getByTestId } = renderWithProvider(<BasketPage />);
  const div = getByTestId('basket-div');
  expect(div).not.toHaveTextContent('Basket is empty');
  expect(div).toHaveTextContent(fakeProduct.name);
  expect(div).toHaveTextContent('£' + fakeProduct.price);
  expect(div).toHaveTextContent('Confirm Order');
  getByTestId('remove-btn-basket');
  expect(div).toHaveTextContent('Total: ' + fakeProduct.price);
});

test('Remove item from basket', () => {
  window.sessionStorage.setItem(
    'basket',
    JSON.stringify({ items: [fakeProduct] })
  );
  const { getByTestId, getByText } = renderWithProvider(<BasketPage />);
  fireEvent.click(getByTestId('remove-btn-basket'));
  getByText('Basket is empty');
});

test('Remove specific item from basket', () => {
  window.sessionStorage.setItem(
    'basket',
    JSON.stringify({ items: fakeProductState })
  );
  const { getAllByTestId, getByTestId } = renderWithProvider(<BasketPage />);

  const div_before = getByTestId('basket-div');
  expect(div_before).toHaveTextContent('Total: 6.33');
  expect(div_before).toHaveTextContent(fakeProductState[1].name);
  expect(div_before).toHaveTextContent('£' + fakeProductState[1].price);

  fireEvent.click(getAllByTestId('remove-btn-basket')[1]);
  const div_after = getByTestId('basket-div');
  expect(div_after).not.toHaveTextContent(fakeProductState[1].name);
  expect(div_after).not.toHaveTextContent('£' + fakeProductState[1].price);
  expect(div_after).toHaveTextContent('Total: 4.33');
});

test('check confirm order button redirect to order from', () => {
  window.sessionStorage.setItem(
    'basket',
    JSON.stringify({ items: [fakeProduct] })
  );
  const { getByText, getByTestId } = renderWithProvider(
    <>
      <BasketPage /> <NewOrder />
    </>
  );

  getByText('Total: ' + fakeProduct.price);
  fireEvent.click(getByText('Confirm Order'));
  const div = getByTestId('order-from');
  expect(div).not.toHaveTextContent('Total: ' + fakeProduct.price);
  expect(div).toHaveTextContent('Email');
  expect(div).toHaveTextContent('Customer Name');
  expect(div).toHaveTextContent('Contact number');
  expect(div).toHaveTextContent('Place Order');
});
