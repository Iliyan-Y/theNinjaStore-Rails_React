import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import { useSelector } from 'react-redux';
import {
  renderWithFakeProvider,
  fakeProductState,
} from 'packs/__test__/react_helpers';

import App from 'packs/components/app.jsx';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
useSelector.mockImplementation(() => fakeProductState);

beforeEach(() => {
  console.error = jest.fn();
  console.error('you cant see me');
});

afterEach(cleanup);

test('render', () => {
  renderWithFakeProvider(<App />);
});

test('render all test items', () => {
  const { getByText, getByTestId } = renderWithFakeProvider(<App />);
  getByText('Test item 2');
  getByText('product 3');
  expect(getByTestId('Image-1')).toHaveAttribute('src', 'image 1');
});
