import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DeleteProduct = ({ productId }) => {
  let history = useHistory();

  let deleteItem = () => {
    axios
      .delete('/api/v1/products/' + productId)
      .then(() => history.push('/'))
      .catch((err) => console.error(err.message));
  };
  return <button onClick={() => deleteItem()}>Delete</button>;
};

export default DeleteProduct;
