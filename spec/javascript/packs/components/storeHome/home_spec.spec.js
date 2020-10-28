import React from 'react';
import { shallow } from 'enzyme';
import Home from 'packs/components/storeHome/home';

describe('HelloReact component', () => {
  const container = shallow(<Home />);
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });
});
