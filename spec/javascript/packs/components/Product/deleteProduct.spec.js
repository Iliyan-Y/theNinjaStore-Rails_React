import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import DeleteProduct from 'packs/components/Product/deleteProduct';

jest.mock('axios', () => ({
  delete: jest.fn(),
}));

afterAll(cleanup);

test('render the delete button', () => {
  const { getByText } = render(<DeleteProduct />);
  expect(getByText('Delete')).toBeInTheDocument();
});

test('click the delete button triggers axios delete request', async () => {
  axios.delete.mockResolvedValue({});
  const { getByText } = render(<DeleteProduct />);
  let delBtn = getByText('Delete');
  await waitFor(() => fireEvent.click(delBtn));
  expect(axios.delete).toHaveBeenCalledTimes(1);
});
