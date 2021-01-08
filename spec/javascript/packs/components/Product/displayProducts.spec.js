import React from 'react';
import { fireEvent, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import DisplayProducts from 'packs/components/Product/displayProducts.jsx';
import {
  fakeProductState,
  renderWithProvider,
} from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';

// jest.mock('axios');
// axios.get.mockResolvedValue({ data: 'ok' });
// axios.post.mockResolvedValue({ data: 'ok' });

beforeEach(() => {
  console.error = jest.fn();
});

afterEach(cleanup);

test('render component with products', () => {
  const { getByText, getAllByText } = renderWithProvider(
    <DisplayProducts products={fakeProductState} />
  );
  getByText(fakeProductState[0].name);
  getByText(fakeProductState[1].name);
  getByText(fakeProductState[2].name);
  expect(getAllByText('Add to basket').length).toEqual(fakeProductState.length);
});

test('sumarize long descriptions', () => {
  const { getAllByTestId } = renderWithProvider(
    <DisplayProducts products={fakeProductState} />
  );
  let thirdDescription = getAllByTestId('short-description')[2];
  expect(thirdDescription).toHaveTextContent(
    'test description 3, its actually more then a description its super long descript...'
  );
  expect(thirdDescription).not.toHaveTextContent(
    fakeProductState[2].description
  );
});
