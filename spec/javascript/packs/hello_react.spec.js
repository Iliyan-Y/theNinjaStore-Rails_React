import React from 'react';
import { shallow } from 'enzyme';
import App from 'packs/components/app';

describe('HelloReact component', () => {
  describe('Basic test', () => {
    it('render Hello Caique!', () => {
      expect(shallow(<App />).text()).toBe('<Home />');
    });
  });
});
