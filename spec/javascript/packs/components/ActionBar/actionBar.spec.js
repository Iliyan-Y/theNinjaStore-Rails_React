import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

import ActionBar from 'packs/components/ActionBar/actionBar';

//mock
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
useSelector.mockImplementation(() => []);
const mockStore = configureStore();
let store = mockStore({});

afterEach(cleanup);

test('renders the default action bar', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Provider store={store}>
        <ActionBar />
      </Provider>
    </BrowserRouter>
  );
  getByText('The Ninja Store');
  getByText('Log In');
  getByText('Sign Up');
  getByText('Basket: 0');
});
