import React from 'react';
import { waitFor, cleanup, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import {
  renderWithProvider,
  fakeOrderList,
} from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';
import ViewAllOrders from 'packs/components/AdminPanel/viewAllOrders';

jest.mock('axios');
axios.get.mockResolvedValue({
  data: fakeOrderList,
});

beforeEach(() => {
  console.error = jest.fn();
  console.error('you cant see me');
});

afterEach(cleanup);

test('Renders the component', () => {
  renderWithProvider(<ViewAllOrders />);
});

test('Renders the component with list of products after fetching data', async () => {
  const { getByTestId } = renderWithProvider(<ViewAllOrders />);
  const div = getByTestId('all-orders-div');
  expect(div).not.toHaveTextContent(fakeOrderList[0].email);
  expect(div).not.toHaveTextContent(fakeOrderList[1].email);

  const divAfterAxiosRequest = await waitFor(() =>
    getByTestId('all-orders-div')
  );
  expect(divAfterAxiosRequest).toHaveTextContent(fakeOrderList[0].email);
  expect(divAfterAxiosRequest).toHaveTextContent(fakeOrderList[1].email);
});

test('Renders select option for each order', async () => {
  renderWithProvider(<ViewAllOrders />);
  let selectOptionBefore = document.getElementsByTagName('select');
  expect(selectOptionBefore.length).toBe(0);

  let selectOptionAfter = await waitFor(() =>
    document.getElementsByTagName('select')
  );
  expect(selectOptionAfter.length).toBe(fakeOrderList.length);
});

test('order list load with less details', async () => {
  const { getByTestId } = renderWithProvider(<ViewAllOrders />);
  const detailsSpan = await waitFor(() =>
    getByTestId('order-details-' + fakeOrderList[0].id)
  );
  const style = window.getComputedStyle(detailsSpan);
  expect(style.display).toBe('none');
});

test('expand order status', async () => {
  const { getAllByText, getByTestId } = renderWithProvider(<ViewAllOrders />);
  let firstOrder = await waitFor(() => getAllByText(/Customer name: /)[0]);
  fireEvent.click(firstOrder);

  const detailsSpan = getByTestId('order-details-' + fakeOrderList[0].id);
  const style = window.getComputedStyle(detailsSpan);
  expect(style.display).toBe('flex');
});

test('collapse order status', async () => {
  const { getAllByText, getByTestId } = renderWithProvider(<ViewAllOrders />);
  let firstOrder = await waitFor(() => getAllByText(/Customer name: /)[0]);
  fireEvent.click(firstOrder);
  fireEvent.click(firstOrder);
  const detailsSpan = getByTestId('order-details-' + fakeOrderList[0].id);
  const style = window.getComputedStyle(detailsSpan);
  expect(style.display).toBe('none');
});
