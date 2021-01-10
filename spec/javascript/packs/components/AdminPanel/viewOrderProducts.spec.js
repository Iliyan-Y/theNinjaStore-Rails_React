import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { fakeProductState } from 'packs/__test__/react_helpers';
import ViewOrderProducts from 'packs/components/AdminPanel/viewOrderProducts';
import axios from 'axios';

jest.mock('axios');
const productsId = [1, 2];
console.error = jest.fn();

test('Render the component', async () => {
  const { getByText } = render(<ViewOrderProducts productsId={productsId} />);
  expect(getByText('Products: ' + productsId.length)).toBeInTheDocument();
});

test('Click the button triggers axios post request', async () => {
  axios.post.mockResolvedValue({ data: fakeProductState });
  const { getByText } = render(<ViewOrderProducts productsId={[]} />);
  let productBtn = getByText(/Products:/);
  await waitFor(() => fireEvent.click(productBtn));
  expect(axios.post).toHaveBeenCalledTimes(1);
});
