import React from 'react';
import {
  renderWithProvider,
  fakeProduct,
  createFakeFile,
  addFakeCoverPhoto,
} from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import EditProduct from 'packs/components/Product/editProduct.jsx';
import axios from 'axios';

jest.mock('axios', () => ({
  patch: jest.fn(),
}));

test('render the component with all relative fields', () => {
  const { getByPlaceholderText, getByText, getByTestId } = renderWithProvider(
    <EditProduct product={fakeProduct} />
  );
  getByText('Edit');
  getByPlaceholderText('title');
  getByPlaceholderText('description');
  getByPlaceholderText('price');
  getByTestId('photo-upload');
  getByText('Submit');
  getByText('Cancel');
});

test('form is not visible when the component is rendered', async () => {
  renderWithProvider(<EditProduct product={fakeProduct} />);

  let div = document.getElementsByTagName('div')[1];
  const style = window.getComputedStyle(div);
  expect(style.display).toBe('none');
});

test('form is visible after Edit button is clicked', async () => {
  const { getByText } = renderWithProvider(
    <EditProduct product={fakeProduct} />
  );
  let button = getByText('Edit');
  fireEvent.click(button);
  let div = document.getElementsByTagName('div')[1];
  const style = window.getComputedStyle(div);
  expect(style.display).toBe('flex');
});

test('Text inputs of the form', () => {
  const { getByPlaceholderText, getByDisplayValue } = renderWithProvider(
    <EditProduct product={fakeProduct} />
  );

  let titleField = getByPlaceholderText('title');
  let descriptionField = getByPlaceholderText('description');
  let priceField = getByPlaceholderText('price');

  fireEvent.change(titleField, {
    target: {
      value: 'Medium Roasted Coffee',
    },
  });
  fireEvent.change(descriptionField, {
    target: {
      value: 'strong coffee beans',
    },
  });
  fireEvent.change(priceField, {
    target: {
      value: 12,
    },
  });
  getByDisplayValue('Medium Roasted Coffee');
  getByDisplayValue('strong coffee beans');
  getByDisplayValue('12');
});

// FIX ME
// test('Cover photo uploader', async () => {
//   const file = createFakeFile('chucknorris.png', 'image/png');
//   const { getByTestId } = renderWithProvider(
//     <EditProduct product={fakeProduct} />
//   );
//   let uploader = getByTestId('photo-upload');
//   await addFakeCoverPhoto(uploader, [file]);

//   let image = document.getElementById('cover-photo-change');
//   expect(image.files[0].name).toBe('chucknorris.png');
//   expect(image.files.length).toBe(1);
// });

test('submit send axios patch request', () => {
  axios.patch.mockResolvedValue({});

  const { getByText } = renderWithProvider(
    <EditProduct product={fakeProduct} />
  );
  const submit = getByText('Submit');
  fireEvent.click(submit);
  expect(axios.patch).toHaveBeenCalledTimes(1);
});

test('cancel hide the form', async () => {
  const { getByText } = renderWithProvider(
    <EditProduct product={fakeProduct} />
  );
  let editBtn = getByText('Edit');
  fireEvent.click(editBtn);
  let cancelBtn = getByText('Cancel');
  fireEvent.click(cancelBtn);
  let div = document.getElementsByTagName('div')[1];
  const style = window.getComputedStyle(div);
  expect(style.display).toBe('none');
});
