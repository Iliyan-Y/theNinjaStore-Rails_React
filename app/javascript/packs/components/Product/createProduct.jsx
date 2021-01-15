import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  validateProductForm,
  validateFileType,
  imageOptions,
  validateGallery,
} from '../../helpers/formValidators';
import imageCompression from 'browser-image-compression';

const CreateProduct = () => {
  let history = useHistory();
  const [cookies] = useCookies();
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [image, setImage] = useState(undefined);
  let [gallery, setGallery] = useState([]);
  let [valid, setValid] = useState('default');

  useEffect(() => {
    let token = cookies.user_token;
    verifyUser(token);
  }, []);

  const verifyUser = (token) => {
    axios
      .get('/new/product', {
        headers: {
          'token': token,
        },
      })
      .catch((err) => {
        console.error(err.message);
        history.push('/');
      });
  };

  let submit = () => {
    const [validateInput, error] = validateProductForm(
      name,
      description,
      price,
      image
    );
    if (validateInput) {
      let body = createBody();
      postProduct(body);
    } else {
      setValid(error);
    }
  };

  const createBody = () => {
    const body = new FormData();
    body.append('product[name]', name);
    body.append('product[description]', description);
    body.append('product[price]', price);
    body.append('product[image]', image);
    for (let i = 0; i < 5; i++) {
      body.append(`photos[${i}]`, gallery[i]);
    }
    return body;
  };

  const postProduct = (body) => {
    axios
      .post('/api/v1/products', body, {
        headers: { 'token': cookies.user_token },
      })
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.error(err.message));
  };

  let attachGallery = (images) => {
    if (images.length <= 5) {
      let compressedImages = compressGallery(validateGallery(images));
      setGallery(compressedImages);
    } else alert('Only 5 files allowed');
  };

  const compressGallery = (uncompressed) => {
    let all = [];
    uncompressed.map((imageFile) => {
      imageCompression(imageFile, imageOptions).then((compressedImage) =>
        all.push(compressedImage)
      );
    });
    return all;
  };

  const addCoverImage = (image) => {
    validateFileType(image)
      ? imageCompression(image, imageOptions).then((compressedImage) =>
          setImage(compressedImage)
        )
      : alert('File can be only image type');
  };

  return (
    <div style={outerDiv}>
      <p>Title</p>
      <input
        style={valid == 'title' ? inputStyle.error : inputStyle.default}
        type="text"
        placeholder="title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <p>Description</p>
      <textarea
        style={valid == 'description' ? inputStyle.error : inputStyle.default}
        placeholder="description"
        cols="30"
        rows="5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <p>Price</p>
      <input
        style={valid == 'price' ? inputStyle.error : inputStyle.default}
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="photoCover">Photo Cover:</label>
      <input
        style={valid == 'image' ? inputStyle.error : inputStyle.image}
        data-testid="photo-upload"
        type="file"
        name="photoCover"
        id="photoCover"
        onChange={(e) => addCoverImage(e.target.files[0])}
      />
      <label htmlFor="Gallery">Gallery:</label>
      <input
        data-testid="gallery"
        type="file"
        name="Gallery"
        id="Gallery"
        multiple
        onChange={(e) => attachGallery(e.target.files)}
      />
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};

export default CreateProduct;

let outerDiv = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  minWidth: '300px',
  margin: '1em auto',
};

const inputStyle = {
  error: { border: '2px solid red' },
  default: { border: '1px solid grey' },
  image: { border: 'none' },
};
