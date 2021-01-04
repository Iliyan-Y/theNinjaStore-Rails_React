import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { renderWithFakeProvider } from 'packs/__test__/react_helpers';
import UserMenu from 'packs/components/ActionBar/menuOptions/userMenu.jsx';

//mock
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
  renderWithFakeProvider(<UserMenu />);
});

test('renders the Menu dropdown button', () => {
  const { getByText } = renderWithFakeProvider(
    <UserMenu isAdmin={false} isUser={true} />
  );
  getByText('Menu');
});

test('renders the dropdown options', async () => {
  const { getByText } = renderWithFakeProvider(
    <UserMenu isAdmin={false} isUser={true} />
  );
  fireEvent.click(getByText('Menu'));
  getByText('My Orders');
  getByText('Log Out');
});

test('it not render the user menu if user is Admin', () => {
  const { getByText } = renderWithFakeProvider(
    <UserMenu isAdmin={true} isUser={true} />
  );
  expect(() => getByText('Menu')).toThrow('Unable to find an element');
});

test('it not render the menu if theres no user', () => {
  const { getByText } = renderWithFakeProvider(<UserMenu isUser={false} />);
  expect(() => getByText('Menu')).toThrow('Unable to find an element');
});
