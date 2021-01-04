import React from 'react';
import { renderWithProvider, fakeOrder } from 'packs/__test__/react_helpers';
import '@testing-library/jest-dom/extend-expect';
import OrderDetails from 'packs/components/AdminPanel/orderDetails';

test('render the component', () => {
  renderWithProvider(<OrderDetails order={fakeOrder} />);
});
