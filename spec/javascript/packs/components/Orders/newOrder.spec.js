import NewOrder from 'packs/components/Orders/newOrder.jsx';
import React from 'react';
import { fakeProduct } from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(),
}));

jest.mock('axios', () => ({
  post: jest.fn(),
}));

window.sessionStorage.setItem(
  'basket',
  JSON.stringify({ items: [fakeProduct] })
);

beforeEach(() => {
  console.error = jest.fn();
});
afterAll(cleanup);

test('render the component', () => {
  const { getByText } = render(<NewOrder />);
  getByText('Place Order');
});

test('clicking place order triggers axios request to start stripe api process', async () => {
  axios.post.mockResolvedValue(false);
  const { getByText } = render(<NewOrder />);
  let btn = getByText('Place Order');
  await waitFor(() => fireEvent.click(btn));
  expect(loadStripe).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledTimes(1);
});
