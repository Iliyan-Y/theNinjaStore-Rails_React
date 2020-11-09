import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateProduct = () => {
  let history = useHistory();
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');
  let [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get('/new/product', {
        headers: {
          'token':
            'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoidGVzdFRva2VuQGdtLmNvbSIsImV4cCI6MTYwNDkyNzQwNX0.m8wXqpBHU6FpjAVfkbWSnmLgczpM4W3g-qXR-WgijeU',
        },
      })
      .then((res) => {
        if (res.status == 403) history.push('/');
      })
      .catch((err) => {
        console.log(err.message);
        history.push('/');
      });
  }, []);

  let submit = () => {
    const body = new FormData();
    body.append('product[name]', name);
    body.append('product[description]', description);
    body.append('product[price]', price);
    body.append('product[image]', image);

    axios
      .post('/api/v1/products', body)
      .then((res) => {
        setName('');
        setDescription('');
        setPrice('');
        setImage(null);
      })
      .catch((err) => console.log('Error : ' + err.message));
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

      <button onClick={() => submit()}>Submit</button>
    </div>
  );
};

export default CreateProduct;
