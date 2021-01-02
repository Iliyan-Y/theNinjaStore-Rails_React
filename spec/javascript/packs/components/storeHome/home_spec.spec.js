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
useSelector.mockImplementation(() => []);

jest.mock('axios');
axios.get.mockResolvedValue({});

describe('Home component', () => {
  beforeEach(() => {
    console.error = jest.fn();
    console.error('you cant see me');
  });

  it('Check the home page renders correctly', () => {
    //mock
    const mockStore = configureStore();
    let store = mockStore({});

    //render
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );

    //expected
    getByText('Home Page');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledTimes(1);
  });
});
