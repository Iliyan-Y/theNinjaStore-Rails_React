import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import DeleteWarning from './deleteWarning';

const DeleteProduct = ({ productId }) => {
  let history = useHistory();
  const [cookies] = useCookies();
  let [warning, setWarning] = useState(false);

  let deleteItem = () => {
    let token = cookies.user_token;
    axios
      .delete('/api/v1/products/' + productId, {
        headers: {
          'token': token,
        },
      })
      .then(() => history.push('/'))
      .catch((err) => console.error(err.message));
  };

  return (
    <>
      <DeleteWarning warning={warning} setWarning={setWarning} />
      <button className="btn btn-danger" onClick={() => setWarning(!warning)}>
        Delete
      </button>
    </>
  );
};

export default DeleteProduct;
