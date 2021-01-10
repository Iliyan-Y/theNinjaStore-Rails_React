import React from 'react';
import axios from 'axios';
import { fakeOrderList } from 'packs/__test__/react_helpers';
import { render, waitFor, fireEvent } from '@testing-library/react';
import UserOrders from 'packs/components/UserPanel/userOrders';
import '@testing-library/jest-dom/extend-expect';
import { dateToString } from 'packs/helpers/covertDate';

jest.mock('axios', () => ({
  get: jest.fn(),
}));
axios.get.mockResolvedValue({ data: fakeOrderList });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-cookie', () => ({
  useCookies: () => [
    {
      user_token: true,
    },
  ],
}));

test('render the component with all orders', async () => {
  const { getAllByTestId } = render(<UserOrders />);

  const orders = await waitFor(() => getAllByTestId('user-order-div'));
  expect(orders.length).toBe(fakeOrderList.length);

  let counter = 0;
  orders.forEach((order) => {
    expect(order).toHaveTextContent(
      `↓ Created: ${dateToString(
        fakeOrderList[counter].created_at
      )} | Number of products: ${
        fakeOrderList[counter].productsId.length
      } | Status: ${fakeOrderList[counter].status} ↓`
    );
    counter++;
  });
});

test('Orders are rendered with collapsed details at first', async () => {
  const { getByTestId } = render(<UserOrders />);
  const order = await waitFor(() =>
    getByTestId('order-details-' + fakeOrderList[0].id)
  );
  expect(order).toHaveStyle('display: none');
});

test('Orders are expandable when click on order tab', async () => {
  const { getByTestId, getAllByText } = render(<UserOrders />);

  let firstOrder = await waitFor(() => getAllByText(/Created:/)[0]);
  fireEvent.click(firstOrder);
  const order = getByTestId('order-details-' + fakeOrderList[0].id);

  expect(order).toHaveStyle('display: flex');
});
