import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'packs/store';
import configureStore from 'redux-mock-store';

export const renderWithProvider = (component) => {
  return render(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );
};

export const renderWithFakeProvider = (component) => {
  const mockStore = configureStore();
  let fakeStore = mockStore({});

  return render(
    <BrowserRouter>
      <Provider store={fakeStore}>{component}</Provider>
    </BrowserRouter>
  );
};

export const fakeProductState = [
  {
    id: 1,
    name: 'test',
    description: 'test description',
    image: 'image 1',
    price: '1.00',
  },
  {
    id: 2,
    name: 'Test item 2',
    description: 'test description 2',
    image: 'url 2',
    price: '2.00',
  },
  {
    id: 3,
    name: 'product 3',
    description: 'test description 3',
    image: 'url 3',
    price: '3.33',
  },
];

export const fakeOrder = {
  id: 1,
  created_at: '04.01.2021',
  email: 'example@me.com',
  address: 'London 2',
  post_code: '13LZ',
  phone: '1234',
  productsId: [1, 2],
};

export const fakeOrderList = [
  {
    id: 1,
    created_at: '04.01.2021',
    email: 'example@me.com',
    address: 'London 2',
    post_code: '13LZ',
    phone: '1234',
    productsId: [1, 2],
    status: 'New',
    customer_name: 'Chocho',
  },
  {
    id: 2,
    created_at: '05.01.2021',
    email: 'me@me.com',
    address: 'London 1',
    post_code: 'ELY',
    phone: '5555',
    productsId: [1],
    status: 'New',
    customer_name: 'Kiro',
  },
];
