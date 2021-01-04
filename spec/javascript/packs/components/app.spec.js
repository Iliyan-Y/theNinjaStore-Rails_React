import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
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
  const { getByText, getByTestId, getAllByText } = renderWithFakeProvider(
    <App />
  );
  getByText('Test item 2');
  getByText('product 3');
  expect(getByTestId('Image-1')).toHaveAttribute('src', 'image 1');
  getAllByText('Add to basket');
});

test('click emty basket button', () => {
  const { getByText } = renderWithFakeProvider(<App />);
  fireEvent.click(getByText('Basket: 0'));
  getByText('Basket is empty');
});

test('render default action bar', () => {
  const { getByText } = renderWithFakeProvider(<App />);
  getByText('Log In');
  getByText('Sign Up');
  getByText('Basket: 0');
});

test('render default log in from', () => {
  const { getByText, getByPlaceholderText } = renderWithFakeProvider(<App />);
  fireEvent.click(getByText('Log In'));
  getByPlaceholderText('Email');
  getByPlaceholderText('Password');
  getByText('Submit');
});

test('render default sign up form', () => {
  const { getByText, getByPlaceholderText } = renderWithFakeProvider(<App />);
  fireEvent.click(getByText('Sign Up'));
  getByPlaceholderText('Email');
  getByPlaceholderText('Password');
  getByText('Submit');
  getByPlaceholderText('Confirm Password');
});

test('logo click return to home', () => {
  const { getByText, getByTestId } = renderWithFakeProvider(<App />);
  fireEvent.click(getByTestId('basket-btn'));
  getByText('Basket is empty');
  fireEvent.click(getByTestId('logo-1'));
  getByText('Test item 2');
});
