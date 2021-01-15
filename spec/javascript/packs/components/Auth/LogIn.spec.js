import React from 'react';
import LogIn from 'packs/components/Auth/LogIn';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
const mockSetCookie = jest.fn();
jest.mock('react-cookie', () => ({
  useCookies: () => [
    {
      user_token: true,
    },
    mockSetCookie,
  ],
}));

beforeAll(() => {
  console.error = jest.fn();
});

afterAll(cleanup);

test('render the component', () => {
  const { getByText, getByPlaceholderText } = render(<LogIn />);
  getByText('Submit');
  getByPlaceholderText('Email');
  getByPlaceholderText('Password');
});

test('inputs values', () => {
  const { getByPlaceholderText, getByDisplayValue } = render(<LogIn />);
  let emailField = getByPlaceholderText('Email');
  let password = getByPlaceholderText('Password');
  fireEvent.change(emailField, {
    target: {
      value: 'example@me.com',
    },
  });
  fireEvent.change(password, {
    target: {
      value: 'test',
    },
  });

  getByDisplayValue('example@me.com');
  getByDisplayValue('test');
});

test('Submit button trigger axios request', async () => {
  axios.post.mockResolvedValue({ data: { data: { user: 'name' } } });
  const { getByText } = render(<LogIn />);
  const submitBtn = getByText('Submit');
  await waitFor(() => fireEvent.click(submitBtn));
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(mockSetCookie).toHaveBeenCalledTimes(1);
});
