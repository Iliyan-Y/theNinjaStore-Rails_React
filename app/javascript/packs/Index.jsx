import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </CookiesProvider>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
  );
});
