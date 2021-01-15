import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateProduct from 'packs/components/Product/createProduct';
import axios from 'axios';
import {
  fillProductForm,
  createFakeFile,
  addFakeCoverPhoto,
} from 'packs/__test__/react_helpers';
import * as validator from 'packs/helpers/formValidators.js';

let file;
let mockPush = jest.fn();
jest.mock('axios');
axios.get.mockResolvedValue({ data: 'ok' });
axios.post.mockResolvedValue({ data: 'ok' });
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

beforeEach(() => {
  console.error = jest.fn();
  file = createFakeFile('chucknorris.png', 'image/png');
});

afterEach(cleanup);

describe('Load the component', () => {
  test('check if user is allowed when the page loads', async () => {
    render(<CreateProduct />);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('not allowed users are redirected to home', async () => {
    axios.get.mockRejectedValue({ message: 'Not allowed' });
    render(<CreateProduct />);
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
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
    getByText(/Gallery/);
  });
});

describe('form validation', () => {
  let alertMock;

  beforeEach(() => {
    alertMock = jest.fn();
    global.alert = alertMock;
  });

  test('Empty form can NOT be submitted', async () => {
    const { getByText } = render(<CreateProduct />);
    const btn = getByText('Submit');
    await waitFor(() => fireEvent.click(btn));
    expect(axios.post).toHaveBeenCalledTimes(0);
  });

  test('submit a valid form with all inputs', async () => {
    let original = validator.validateProductForm;
    validator.validateProductForm = jest.fn().mockReturnValueOnce([true, '']);
    const {
      getByPlaceholderText,
      getByDisplayValue,
      getByText,
      getByTestId,
    } = render(<CreateProduct />);
    let title = getByPlaceholderText('title');
    let description = getByPlaceholderText('description');
    let price = getByPlaceholderText('price');
    fillProductForm(title, description, price);
    getByDisplayValue('New test product');
    getByDisplayValue('Organic sand');
    getByDisplayValue('1000');
    let uploader = getByTestId('photo-upload');
    await addFakeCoverPhoto(uploader, [file]);
    fireEvent.click(getByText('Submit'));
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(mockPush).toHaveBeenCalledWith('/');
    validator.validateProductForm = original;
  });

  test('submit invalid tile value highlight the area', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateProduct />);
    await waitFor(() => fireEvent.click(getByText('Submit')));
    let title = getByPlaceholderText('title');
    expect(alertMock).toHaveBeenCalledWith(
      'Title must be at least 3 characters long'
    );
    expect(title).toHaveStyle('border: 2px solid red');
  });

  test('submit invalid description value highlight the area', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateProduct />);
    let title = getByPlaceholderText('title');
    let description = getByPlaceholderText('description');
    let price = getByPlaceholderText('price');
    fillProductForm(title, description, price);
    fireEvent.change(description, {
      target: {
        value: '',
      },
    });
    await waitFor(() => fireEvent.click(getByText('Submit')));
    let descriptionArea = getByPlaceholderText('description');
    expect(descriptionArea).toHaveStyle('border: 2px solid red');
    expect(alertMock).toHaveBeenCalledWith(
      'Description must be at least 3 characters long'
    );
  });

  test('submit invalid price value highlight the area', async () => {
    const { getByText, getByPlaceholderText } = render(<CreateProduct />);
    let title = getByPlaceholderText('title');
    let description = getByPlaceholderText('description');
    let price = getByPlaceholderText('price');
    fillProductForm(title, description, price);
    fireEvent.change(price, {
      target: {
        value: '0',
      },
    });

    await waitFor(() => fireEvent.click(getByText('Submit')));
    let priceArea = getByPlaceholderText('price');
    expect(priceArea).toHaveStyle('border: 2px solid red');
    expect(alertMock).toHaveBeenCalledWith('Price must be greater then 0');
  });

  test('submit invalid cover image highlight the area', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <CreateProduct />
    );
    let title = getByPlaceholderText('title');
    let description = getByPlaceholderText('description');
    let price = getByPlaceholderText('price');
    fillProductForm(title, description, price);
    await waitFor(() => fireEvent.click(getByText('Submit')));
    let coverPhoto = getByTestId('photo-upload');
    expect(coverPhoto).toHaveStyle('border: 2px solid red');
  });
});

describe('Upload files', () => {
  test('cover photo upload', async () => {
    const { getByTestId } = render(<CreateProduct />);
    let uploader = getByTestId('photo-upload');
    await addFakeCoverPhoto(uploader, [file]);
    let image = document.getElementById('photoCover');
    expect(image.files[0].name).toBe('chucknorris.png');
    expect(image.files.length).toBe(1);
  });

  test('gallery uploads multiple files', async () => {
    const file_2 = createFakeFile('robocop.png', 'image/png');
    const { getByTestId } = render(<CreateProduct />);
    let uploader = getByTestId('gallery');
    await addFakeCoverPhoto(uploader, [file, file_2]);

    let image = document.getElementById('Gallery');
    expect(image.files[0].name).toBe('chucknorris.png');
    expect(image.files[1].name).toBe('robocop.png');
    expect(image.files.length).toBe(2);
  });

  test('uploading more then 5 photos in to the gallery rise error', async () => {
    let alertMock = jest.fn();
    global.alert = alertMock;
    let allFiles = [];
    for (let i = 0; i != 6; i++) {
      allFiles.push(createFakeFile('robocop.png', 'image/png'));
    }
    const { getByTestId, getByRole } = render(<CreateProduct />);
    let uploader = getByTestId('gallery');
    await addFakeCoverPhoto(uploader, allFiles);
    expect(alertMock).toHaveBeenCalledWith('Only 5 files allowed');
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});
