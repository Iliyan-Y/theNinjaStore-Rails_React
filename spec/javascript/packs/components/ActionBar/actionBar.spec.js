import React from 'react';
import { cleanup } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { renderWithFakeProvider } from 'packs/__test__/react_helpers';

import ActionBar from 'packs/components/ActionBar/actionBar';

//mock
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
useSelector.mockImplementation(() => []);

afterEach(cleanup);

test('renders the default action bar', () => {
  const { getByText } = renderWithFakeProvider(<ActionBar />);
  getByText('The Ninja Store');
  getByText('Log In');
  getByText('Sign Up');
  getByText('Basket: 0');
});
