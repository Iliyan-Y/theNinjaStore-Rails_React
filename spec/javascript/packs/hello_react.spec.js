import React from 'react';
import { shallow } from 'enzyme';
import App from 'packs/components/app';

describe('App component', () => {
  describe('Basic test', () => {
    it('render Hello Caique!', () => {
      expect(shallow(<App />).text()).toBe('<Home />');
    });
  });
});
