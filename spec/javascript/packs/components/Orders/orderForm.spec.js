import React from 'react';
import { renderWithProvider } from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import NewOrder from 'packs/components/Orders/orderForm';

test('render the component', () => {
  const { getByTestId } = renderWithProvider(<NewOrder />);
  const div = getByTestId('order-from');
  expect(div).toHaveTextContent('Email');
  expect(div).toHaveTextContent('Customer Name');
  expect(div).toHaveTextContent('Contact number');
  expect(div).toHaveTextContent('Place Order');
});

test('email input changes', () => {
  const { getByDisplayValue, getByPlaceholderText } = renderWithProvider(
    <NewOrder />
  );
  let emailField = getByPlaceholderText('Email');

  fireEvent.change(emailField, {
    target: {
      value: 'example@me.com',
    },
  });

  getByDisplayValue('example@me.com');
});

test('change customer name input', () => {
  const { getByDisplayValue, getByPlaceholderText } = renderWithProvider(
    <NewOrder />
  );
  let nameField = getByPlaceholderText('Name');

  fireEvent.change(nameField, {
    target: {
      value: 'Ivo Ivanov',
    },
  });

  getByDisplayValue('Ivo Ivanov');
});

test('change Contact number input', () => {
  const { getByDisplayValue, getByPlaceholderText } = renderWithProvider(
    <NewOrder />
  );
  let phoneField = getByPlaceholderText('Phone Number');

  fireEvent.change(phoneField, {
    target: {
      value: '00001',
    },
  });
  getByDisplayValue('00001');
});
