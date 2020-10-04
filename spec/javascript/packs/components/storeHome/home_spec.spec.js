import React from 'react';
import { shallow } from 'enzyme';
import Home from 'packs/components/storeHome/home';

describe('HelloReact component', () => {
  describe('Basic test', () => {
    it('render Hello Caique!', () => {
      expect(shallow(<Home />).text()).toBe('Home Page');
    });
  });

  it('Render the content from json file on the page', () => {
    let mockContent = {
      'results': [
        {
          'id': 1,
          'name': 'Test',
          'description': 'Test Description',
          'price': '1.0',
          'created_at': '2020-10-04T10:38:45.709Z',
        },
      ],
    };

    let wraper = shallow(<Home />);
    expect(wraper.text()).toBe('Test Test Description £1.00 ');
  });
});
