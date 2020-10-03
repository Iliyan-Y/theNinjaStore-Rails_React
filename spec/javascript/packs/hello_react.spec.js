import React from 'react';
import { shallow } from 'enzyme';
import Hello from 'packs/index';

describe('HelloReact component', () => {
  describe('when a name is given as a prop', () => {
    it('render Hello Caique!', () => {
      expect(shallow(<Hello name="Caique" />).text()).toBe('Hello Caique!');
    });
  });

  describe('when no name is given', () => {
    it('render Hello David!', () => {
      expect(shallow(<Hello />).text()).toBe('Hello David!');
    });
  });
});
