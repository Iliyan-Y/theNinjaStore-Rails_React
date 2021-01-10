import React from 'react';
import ShowProduct from 'packs/components/Product/showProduct';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fakeProduct, renderWithProvider } from 'packs/__test__/react_helpers';
import axios from 'axios';

jest.mock('axios');

beforeEach(() => {
  console.error = jest.fn();
});
afterEach(cleanup);

test('component fetch product data on load', async () => {
  axios.get.mockResolvedValue({ data: fakeProduct });
  const { getByText, getByAltText, getAllByAltText } = await renderWithProvider(
    <ShowProduct match={{ params: { productId: 1 } }} />
  );
  let image = getByAltText(fakeProduct.name);
  expect(image.src).toContain('http://localhost/image%201');
  expect(getByText(fakeProduct.name)).toBeInTheDocument();
  expect(getByText(fakeProduct.description)).toBeInTheDocument();
  let gallery = getAllByAltText(fakeProduct.name + '-gallery');
  expect(gallery.length).toBe(fakeProduct.galery.length);
  expect(getByText('£' + fakeProduct.price)).toBeInTheDocument();
});

test('component reject fetch product data on load', async () => {
  axios.get.mockRejectedValue({ message: 'No such product' });
  const { getByText } = await renderWithProvider(
    <ShowProduct match={{ params: { productId: 1 } }} />
  );
  expect(() => getByText(fakeProduct.name)).toThrow(
    'Unable to find an element with the text: '
  );
  expect(() => getByText(fakeProduct.description)).toThrow(
    'Unable to find an element with the text: '
  );
});
