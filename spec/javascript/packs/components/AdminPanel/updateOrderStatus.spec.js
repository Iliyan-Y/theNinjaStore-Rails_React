import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import UpdateOrderStatus from 'packs/components/AdminPanel/updateOrderStatus';
import { renderWithProvider } from 'packs/__test__/react_helpers';
import { fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

test('Render the dropdown menu with options', () => {
  const { getByText } = renderWithProvider(<UpdateOrderStatus />);
  expect(getByText('New')).toBeInTheDocument();
  expect(getByText('In progress')).toBeInTheDocument();
  expect(getByText('Done')).toBeInTheDocument();
  expect(getByText('Canceled')).toBeInTheDocument();
  expect(getByText('Sent')).toBeInTheDocument();
});

test('Option change trigger axios patch request', async () => {
  axios.patch.mockResolvedValue({});
  const { getByTestId } = renderWithProvider(<UpdateOrderStatus />);
  await waitFor(() =>
    fireEvent.change(getByTestId('select-status'), { target: { value: 1 } })
  );
  expect(axios.patch).toHaveBeenCalledTimes(1);
});
