import React, { useState as useStateMock, setState } from 'react';
import ShowProduct from 'packs/components/Product/showProduct';
import '@testing-library/jest-dom/extend-expect';
import { fakeProduct, renderWithProvider } from 'packs/__test__/react_helpers';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

test('render component with a product and default options', () => {
  useStateMock.mockImplementation((init) => [fakeProduct, setState]);
  const { getByText, getByAltText, getAllByAltText } = renderWithProvider(
    <ShowProduct match={{ params: { productId: 1 } }} />
  );
  let image = getByAltText(fakeProduct.name);
  expect(image.src).toContain('http://localhost/image%201');
  expect(getByText(fakeProduct.name)).toBeInTheDocument();
  expect(getByText(fakeProduct.description)).toBeInTheDocument();
  let gallery = getAllByAltText(fakeProduct.name + '-gallery');
  expect(gallery.length).toBe(fakeProduct.galery.length);
  expect(getByText('£' + fakeProduct.price)).toBeInTheDocument();
  expect(getByText('Add to basket')).toBeInTheDocument();
  expect(() => getByText('Delete')).toThrow(
    'Unable to find an element with the text: Delete.'
  );
  expect(() => getByText('Edit')).toThrow(
    'Unable to find an element with the text: Edit.'
  );
});

test('render component with a product and admin options', () => {
  useStateMock
    .mockImplementationOnce((init) => [fakeProduct, setState])
    .mockImplementationOnce((init) => [{ admin: true }, setState])
    .mockImplementationOnce((init) => [{ admin: true }, setState]);

  const { getByText, getByAltText, getAllByAltText } = renderWithProvider(
    <ShowProduct match={{ params: { productId: 1 } }} />
  );
  let image = getByAltText(fakeProduct.name);
  expect(image.src).toContain('http://localhost/image%201');
  expect(getByText(fakeProduct.name)).toBeInTheDocument();
  expect(getByText(fakeProduct.description)).toBeInTheDocument();
  let gallery = getAllByAltText(fakeProduct.name + '-gallery');
  expect(gallery.length).toBe(fakeProduct.galery.length);
  expect(getByText('£' + fakeProduct.price)).toBeInTheDocument();
  expect(getByText('Add to basket')).toBeInTheDocument();
  expect(getByText('Delete')).toBeInTheDocument();
  expect(getByText('Edit')).toBeInTheDocument();
});
