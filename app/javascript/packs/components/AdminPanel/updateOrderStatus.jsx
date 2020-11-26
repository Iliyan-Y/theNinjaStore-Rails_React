import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';

const UpdateOrderStatus = ({ token, orderId, currentStatus }) => {
  let dispatch = useDispatch();

  let updateStatus = (status) => {
    axios
      .patch(
        '/api/v1/orders/' + orderId,
        { order: { id: orderId, status } },
        { headers: { token } }
      )
      .then(() =>
        dispatch({
          type: 'REFRESH',
          payload: '',
        })
      )
      .catch(() => {});
  };

  return (
    <Form.Group onChange={(e) => updateStatus(e.target.value)}>
      <Form.Control defaultValue={currentStatus} size="sm" as="select">
        <option>In progress</option>
        <option>Done</option>
        <option>Canceled</option>
        <option>New</option>
        <option>Sent</option>
      </Form.Control>
    </Form.Group>
  );
};

export default UpdateOrderStatus;
