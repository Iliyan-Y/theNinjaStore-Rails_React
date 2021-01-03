import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import Home from 'packs/components/storeHome/home';
import axios from 'axios';
import { renderWithProvider } from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');
axios.get.mockResolvedValue({
  data: [
    {
      id: 1,
      name: 'test',
      description: 'test description',
      image: 'url',
      price: '1.00',
    },
  ],
});

beforeEach(() => {
  console.error = jest.fn();
  console.error('you cant see me');
});

afterEach(cleanup);

test('Check the home page renders correctly', async () => {
  const { getByTestId, queryByText } = renderWithProvider(<Home />);

  queryByText('test');
  const div = await waitFor(() => getByTestId('prod'));
  expect(div).toHaveTextContent('test description');
  expect(div).toHaveTextContent('£1.00');
  expect(div).toHaveTextContent('Add to basket');
  expect(axios.get).toHaveBeenCalledTimes(1);
});
