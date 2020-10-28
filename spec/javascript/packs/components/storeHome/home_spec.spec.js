import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'packs/components/storeHome/home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('HelloReact component', () => {
  it('do something', () => {
    const initialState = [
      {
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
      },
    ];

    //mockstate
    const mockStore = configureStore();
    let store = mockStore(initialState);

    useSelector.mockImplementation(() => initialState);

    //render
    const root = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
      root
    );

    //expected
    expect(root.querySelector('p').textContent).toBe('Home Page');
  });
});
