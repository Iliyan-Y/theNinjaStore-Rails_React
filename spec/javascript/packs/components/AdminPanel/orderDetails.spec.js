import React from 'react';
import { renderWithProvider, fakeOrder } from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';
import OrderDetails from 'packs/components/AdminPanel/orderDetails';

test('render the component', () => {
  renderWithProvider(<OrderDetails order={fakeOrder} />);
});

test('display orders details', () => {
  const { getByText } = renderWithProvider(
    <OrderDetails order={fakeOrder} showOrder={fakeOrder.id} />
  );
  getByText(fakeOrder.email);
  getByText(fakeOrder.phone);
  getByText(fakeOrder.address);
  getByText(fakeOrder.post_code);
  getByText('Products: ' + fakeOrder.productsId.length);
});

test('Does not display order details if wrong order id passed as prop ', () => {
  renderWithProvider(<OrderDetails order={fakeOrder} showOrder={0} />);
  const span = document.getElementsByTagName('span')[0];
  const style = window.getComputedStyle(span);

  expect(style.display).toBe('none');
});

test('change display style of the span if order id passed correctly', () => {
  renderWithProvider(
    <OrderDetails order={fakeOrder} showOrder={fakeOrder.id} />
  );
  const span = document.getElementsByTagName('span')[0];
  const style = window.getComputedStyle(span);

  expect(style.display).toBe('flex');
});
