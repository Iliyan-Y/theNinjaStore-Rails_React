import React from 'react';
import { render } from '@testing-library/react';
import Home from 'packs/components/storeHome/home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('axios');

describe('Home component', () => {
  it('Check the home page renders correctly', () => {
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

    //mock
    const mockStore = configureStore();
    let store = mockStore(initialState);

    useSelector.mockImplementation(() => initialState);
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: initialState })
    );

    //render
    const { findByText, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );

    //expected
    findByText('Home Page');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledTimes(1);
    getByText('Product');
  });
});
