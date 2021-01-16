import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const DeleteProduct = ({ productId }) => {
  let history = useHistory();
  const [cookies] = useCookies();

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
    <button className="btn btn-danger" onClick={() => deleteItem()}>
      Delete
    </button>
  );
};

export default DeleteProduct;
