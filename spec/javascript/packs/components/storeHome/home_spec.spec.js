import React from 'react';
import { shallow } from 'enzyme';
import Home from 'packs/components/storeHome/home';

describe('HelloReact component', () => {
  describe('Basic test', () => {
    it('render Hello Caique!', () => {
      expect(shallow(<Home />).text()).toBe('home page');
    });
  });
});
