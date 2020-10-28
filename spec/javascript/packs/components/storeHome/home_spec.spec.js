import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'packs/components/storeHome/home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('HelloReact component', () => {
  const initialState = {
    id: '',
    all: [
      {
        id: 'fake id',
        name: 'fake name',
        description: 'fake item',
        image: 'no Image yet',
        created: 'forever',
      },
    ],
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);
  console.log(store.getState());
  const root = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Home />
    </Provider>,
    root
  );

  expect(root.querySelector('p').textContent).toBe('Home Page');
});
