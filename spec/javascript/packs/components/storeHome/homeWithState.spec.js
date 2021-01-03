import React from 'react';
import { cleanup } from '@testing-library/react';
import Home from 'packs/components/storeHome/home';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { renderWithFakeProvider } from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';

//mock
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
useSelector.mockImplementation(() => [
  {
    id: 1,
    name: 'test',
    description: 'test description',
    image: 'url',
    price: '1.00',
  },
]);

jest.mock('axios');
axios.get.mockResolvedValue({});

beforeEach(() => {
  console.error = jest.fn();
  console.error('you cant see me');
});

afterEach(cleanup);

test('Check the home page renders correctly with initial redux state', async () => {
  const { getByText, getByTestId } = renderWithFakeProvider(<Home />);
  getByText('test');
  let div = getByTestId('prod');
  expect(div).toHaveTextContent('test description');
  expect(div).toHaveTextContent('£1.00');
  expect(div).toHaveTextContent('Add to basket');
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(useSelector).toHaveBeenCalledTimes(1);
});
