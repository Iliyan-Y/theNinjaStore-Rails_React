import React, { useState } from 'react';
import axios from 'axios';

const UpdateOrderStatus = ({ token, orderId }) => {
  let [status, setStatus] = useState();

  let updateStatus = () => {
    axios
      .patch(
        '/api/v1/orders/' + orderId,
        { order: { id: orderId, status } },
        { headers: { token } }
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
