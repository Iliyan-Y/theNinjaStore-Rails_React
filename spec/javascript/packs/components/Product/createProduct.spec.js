import React from 'react';
import { render } from '@testing-library/react';
import CreateProduct from 'packs/components/Product/createProduct';

describe('Home component', () => {
  it('Check the create product page is rendered correctly', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <CreateProduct />
    );
    getByPlaceholderText('title');
    getByPlaceholderText('price');
    getByTestId('description-area');
    getByTestId('photo-upload');
    getByText('Submit');
  });
});
