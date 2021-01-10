import React from 'react';
import CheckoutSuccess from 'packs/components/checkout/success';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('render the successful order page', () => {
  const { getByText } = render(<CheckoutSuccess />);
  expect(getByText('Thank you for your purchase')).toBeInTheDocument();
  expect(getByText('Ok')).toBeInTheDocument();
});

test('click ok button trigger redirect to home', async () => {
  const { getByText } = render(<CheckoutSuccess />);
  const okBtn = getByText('Ok');
  await waitFor(() => fireEvent.click(okBtn));
  expect(mockHistoryPush).toBeCalledWith('/');
});

test('it remove session storage for the basket on load', async () => {
  window.sessionStorage.setItem('basket', JSON.stringify({ items: ['cat'] }));
  render(<CheckoutSuccess />);
  await waitFor(() =>
    expect(window.sessionStorage.getItem('basket')).toBe(null)
  );
});
