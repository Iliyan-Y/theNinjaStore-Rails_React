import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const UpdateOrderStatus = ({ token, orderId }) => {
  let [status, setStatus] = useState();
  let dispatch = useDispatch();

  let updateStatus = () => {
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
    <span>
      <input
        type="text"
        placeholder="Status"
        onChange={(e) => setStatus(e.target.value)}
      />
      <button onClick={() => updateStatus()}>Update</button>
    </span>
  );
};

export default UpdateOrderStatus;
