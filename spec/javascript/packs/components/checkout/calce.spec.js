import React from 'react';
import CheckoutCancel from 'packs/components/checkout/cancel.jsx';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor } from '@testing-library/react';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('render the canceled order page', () => {
  const { getByText } = render(<CheckoutCancel />);
  expect(getByText('Order unsuccessful, please try again')).toBeInTheDocument();
  expect(getByText('Ok')).toBeInTheDocument();
});

test('click ok button trigger redirect', async () => {
  const { getByText } = render(<CheckoutCancel />);
  const okBtn = getByText('Ok');
  await waitFor(() => fireEvent.click(okBtn));
  expect(mockHistoryPush).toBeCalledWith('/');
});
