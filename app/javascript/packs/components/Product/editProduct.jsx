import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const EditProduct = ({ product }) => {
  let history = useHistory();
  let [showEdit, setShowEdit] = useState(false);
  let [name, setName] = useState(product.name);
  let [description, setDescription] = useState(product.description);
  let [price, setPrice] = useState(product.price);
  let [image, setImage] = useState();

  let submit = () => {
    const body = new FormData();
    body.append('product[name]', name);
    body.append('product[description]', description);
    body.append('product[price]', price);
    if (image) body.append('product[image]', image);

    axios
      .patch('/api/v1/products/' + product.id, body)
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.log('Error : ' + err.message));
  };
  return (
    <>
      <button onClick={() => setShowEdit(!showEdit)}>Edit</button>
      <div style={{ display: showEdit ? 'block' : 'none' }}>
        <input
          type="text"
          placeholder="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <textarea
          data-testid="description-area"
          cols="30"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          data-testid="photo-upload"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={() => submit()}>Submit</button>
        <button onClick={() => setShowEdit(false)}>Cansel</button>
      </div>
    </>
  );
};

export default EditProduct;
