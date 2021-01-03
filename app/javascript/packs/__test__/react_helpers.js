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
