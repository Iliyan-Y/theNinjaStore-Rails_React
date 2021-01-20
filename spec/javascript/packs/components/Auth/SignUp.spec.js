import React from 'react';
import SingUp from 'packs/components/Auth/SignUp';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');
console.error = jest.fn();
let alertMock = jest.fn();
global.alert = alertMock;

test('Render the sign up component', () => {
  const { getByPlaceholderText, getByText } = render(<SingUp />);
  expect(getByPlaceholderText('Email')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  expect(getByText('Submit')).toBeInTheDocument();
});

test('Submit button trigger axios post request', async () => {
  axios.post.mockRejectedValue({
    message: 'Invalid input',
    response: { data: 'ALERT' },
  });
  const { getByText } = render(<SingUp />);
  const submitBtn = getByText('Submit');
  await waitFor(() => fireEvent.click(submitBtn));

  expect(alertMock).toHaveBeenCalledWith('ALERT');
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(console.error.mock.calls[0][0]).toBe('Invalid input');
});

test('post request send with required params', async () => {
  axios.post.mockResolvedValue({ data: 'das' });
  axios.post.mockRejectedValue({
    message: 'Invalid input',
    response: { data: 'ALERT' },
  });

  const { getByText, getByPlaceholderText } = render(<SingUp />);
  let emailField = getByPlaceholderText('Email');
  let passwordField = getByPlaceholderText('Password');
  let cofPasswordField = getByPlaceholderText('Confirm Password');
  fireEvent.change(emailField, {
    target: {
      value: 'example@me.com',
    },
  });
  fireEvent.change(passwordField, {
    target: {
      value: '1234567',
    },
  });
  fireEvent.change(cofPasswordField, {
    target: {
      value: '1234567',
    },
  });

  const submitBtn = getByText('Submit');
  await waitFor(() => fireEvent.click(submitBtn));
  expect(axios.post).toHaveBeenCalledWith('/api/v1/users', {
    'user': {
      'email': 'example@me.com',
      'password': '1234567',
      'password_confirmation': '1234567',
    },
  });
});
