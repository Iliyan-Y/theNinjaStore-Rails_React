import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateProduct = () => {
  let history = useHistory();
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [image, setImage] = useState(null);
  let [files, setFiles] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    let token = cookies.user_token;
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
  }, []);

  let submit = () => {
    const body = new FormData();
    body.append('product[name]', name);
    body.append('product[description]', description);
    body.append('product[price]', price);
    body.append('product[image]', image);
    for (let i = 0; i < 5; i++) {
      body.append(`photos[${i}]`, files[i]);
    }

    axios
      .post('/api/v1/products', body, {
        headers: { 'token': cookies.user_token },
      })
      .then(() => {
        setName('');
        setDescription('');
        setPrice('');
        setImage(undefined);
        history.push('/');
      })
      .catch((err) => console.log('Error : ' + err.message));
  };

  let addMorePhotos = (e) => {
    if (e.target.files.length <= 5) {
      let f = [];
      [...e.target.files].map((each) => f.push(each));
      setFiles(f);
    } else alert('Only 5 files allowed');
  };

  return (
    <div>
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
      <label htmlFor="files">Select files:</label>
      <input
        type="file"
        name="files"
        id="files"
        multiple
        onChange={(e) => addMorePhotos(e)}
      />
      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};

export default CreateProduct;
