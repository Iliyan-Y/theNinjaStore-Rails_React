import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {
  validateProductForm,
  validateFileType,
  imageOptions,
} from '../../helpers/formValidators';
import imageCompression from 'browser-image-compression';
import { Button } from 'react-bootstrap';

const EditProduct = ({ product }) => {
  let history = useHistory();
  let [showEdit, setShowEdit] = useState(false);
  let [name, setName] = useState(product.name);
  let [description, setDescription] = useState(product.description);
  let [price, setPrice] = useState(product.price);
  let [image, setImage] = useState(product.image);
  const [cookies] = useCookies();

  let submit = () => {
    const [validateInput, error] = validateProductForm(
      name,
      description,
      price,
      image
    );

    validateInput && patchProduct(createBody());
  };

  const createBody = () => {
    const body = new FormData();
    body.append('product[name]', name);
    body.append('product[description]', description);
    body.append('product[price]', price);
    if (image.type != undefined) body.append('product[image]', image);
    return body;
  };

  const patchProduct = (body) => {
    axios
      .patch('/api/v1/products/' + product.id, body, {
        headers: {
          'token': cookies.user_token,
        },
      })
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.error('Error : ' + err.message));
  };

  const addCoverImage = (image) => {
    validateFileType(image)
      ? imageCompression(image, imageOptions).then((compressedImage) =>
          setImage(compressedImage)
        )
      : alert('File can be only image type');
  };

  return (
    <>
      <button
        className="btn btn-warning ml-1"
        onClick={() => setShowEdit(!showEdit)}
      >
        Edit
      </button>
      <div style={editDiv(showEdit)}>
        <input
          className="inputOutline"
          type="text"
          placeholder="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <textarea
          className="inputOutline"
          data-testid="description-area"
          cols="30"
          rows="5"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          className="inputOutline"
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          id="cover-photo-change"
          data-testid="photo-upload"
          type="file"
          onChange={(e) => addCoverImage(e.target.files[0])}
        />
        <div style={buttonDiv}>
          <Button className="btn btn-success mr-1" onClick={() => submit()}>
            Submit
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};
export default EditProduct;

const editDiv = (show) => {
  let display = window.innerWidth;
  let mobile = 460;
  return {
    display: show ? 'flex' : 'none',
    flexDirection: 'column',
    borderRadius: '10px',
    border: '0.5px solid grey',
    width: '40%',
    minWidth: '300px',
    textAlign: 'center',
    position: 'absolute',
    top: '40%',
    left: display < mobile ? '10%' : '28%',
    background: 'white',
    padding: '1em',
  };
};
const buttonDiv = {
  display: 'flex',
  justifyContent: 'center',
};
