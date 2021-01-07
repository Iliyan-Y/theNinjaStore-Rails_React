import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import CreateProduct from 'packs/components/Product/createProduct';
import axios from 'axios';

jest.mock('axios');
axios.get.mockResolvedValue({ data: 'ok' });
axios.post.mockResolvedValue({ data: 'ok' });

beforeEach(() => {
  console.error = jest.fn();
  console.error('you cant see me');
});

afterEach(cleanup);

test('fetch data after component load', async () => {
  render(<CreateProduct />);
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test('Check the create product page is rendered correctly', () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <CreateProduct />
  );
  getByPlaceholderText('title');
  getByPlaceholderText('price');
  getByPlaceholderText('description');
  getByTestId('photo-upload');
  getByText('Submit');
  getByText(/Galery/);
});

test('Check if the submit button works', () => {
  const { getByText } = render(<CreateProduct />);

  const btn = getByText('Submit');
  fireEvent.click(btn);
  expect(axios.post).toHaveBeenCalledTimes(1);
});

test('title field change after input', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<CreateProduct />);
  let title = getByPlaceholderText('title');
  fireEvent.change(title, {
    target: {
      value: 'New test product',
    },
  });
  getByDisplayValue('New test product');
});

test('title field change after input', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<CreateProduct />);
  let description = getByPlaceholderText('description');
  fireEvent.change(description, {
    target: {
      value: 'Organic sand',
    },
  });
  getByDisplayValue('Organic sand');
});

test('title field change after input', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<CreateProduct />);
  let price = getByPlaceholderText('price');
  fireEvent.change(price, {
    target: {
      value: 1000,
    },
  });
  getByDisplayValue('1000');
});

describe('Upload files', () => {
  let file;

  beforeEach(() => {
    file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  });

  test('cover photo upload', async () => {
    const { getByTestId } = render(<CreateProduct />);
    let uploader = getByTestId('photo-upload');
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
    );

    let image = document.getElementById('photoCover');
    expect(image.files[0].name).toBe('chucknorris.png');
    expect(image.files.length).toBe(1);
  });

  test('galery uploads multiple files', async () => {
    const file_2 = new File(['(⌐□_□)'], 'robocop.png', { type: 'image/png' });
    const { getByTestId } = render(<CreateProduct />);
    let uploader = getByTestId('galery');

    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file, file_2] },
      })
    );

    let image = document.getElementById('Galery');
    expect(image.files[0].name).toBe('chucknorris.png');
    expect(image.files[1].name).toBe('robocop.png');
    expect(image.files.length).toBe(2);
  });
});
