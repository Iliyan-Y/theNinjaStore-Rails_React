import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { renderWithFakeProvider } from 'packs/__test__/react_helpers';
import AdminMenu from 'packs/components/ActionBar/menuOptions/adminMenu';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
useSelector.mockImplementation(() => []);

beforeEach(() => {
  console.error = jest.fn();
  console.error('you cant see me');
});

afterEach(cleanup);

test('renders', () => {
  renderWithFakeProvider(<AdminMenu />);
});

test('renders the Menu dropdown button', () => {
  const { getByText } = renderWithFakeProvider(<AdminMenu isAdmin={true} />);
  getByText('Menu');
  expect(() => getByText('Orders')).toThrow('Unable to find an element');
  expect(() => getByText('New Product')).toThrow('Unable to find an element');
});

test('renders the dropdown options', async () => {
  const { getByText } = renderWithFakeProvider(<AdminMenu isAdmin={true} />);
  fireEvent.click(getByText('Menu'));
  getByText('Orders');
  getByText('New Product');
  getByText('Log Out');
});

test('it not render the menu if user is not admin', () => {
  const { getByText } = renderWithFakeProvider(<AdminMenu isAdmin={false} />);
  expect(() => getByText('Menu')).toThrow('Unable to find an element');
  expect(() => getByText('New Product')).toThrow('Unable to find an element');
});
