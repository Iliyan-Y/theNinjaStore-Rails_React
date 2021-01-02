import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateProduct from 'packs/components/Product/createProduct';
import axios from 'axios';

jest.mock('axios');

describe('Home component', () => {
  beforeEach(() => {
    console.error = jest.fn();
    console.error('you cant see me');
  });

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

  it('Check if the submit button works', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({ data: 'data' }));
    const { getByText } = render(<CreateProduct />);

    const btn = getByText('Submit');
    fireEvent.click(btn);
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
