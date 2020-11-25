import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './deleteProduct';
import EditProduct from './editProduct';
import { useCookies } from 'react-cookie';
import { checkForUser } from '../../helpers/checkForuser';
import { v4 as uuid } from 'uuid';
import AddToBasket from '../Basket/addToBasketBtn';

const ShowProduct = ({ match }) => {
  const {
    params: { productId },
  } = match;
  let [product, setProduct] = useState();
  const [cookies] = useCookies();
  let [isUser, setIsUser] = useState(false);

  useEffect(() => {
    axios
      .get('/api/v1/products/' + productId)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err.message));

    let token = cookies.user_token;
    checkForUser(token, setIsUser);
  }, []);

  let renderOptions = () => {
    if (isUser)
      return (
        <div style={{ marginTop: '1.5em' }}>
          <DeleteProduct productId={productId} />
          <EditProduct product={product} />
        </div>
      );
  };

  let renderProducts = () => {
    if (product)
      return (
        <div
          style={{
            padding: '1em',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h4 style={{ fontFamily: 'Gill Sans, sans-serif' }}>
            {product.name}
          </h4>
          <span
            style={{
              display: 'flex',
              alignSelf: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '1em',
            }}
          >
            <img src={product.image} alt="" style={{ width: '35vh' }} />
            <p style={{ width: '50vh', margin: '0 auto', padding: '0.3em' }}>
              {product.description}
            </p>
          </span>
          <span>
            {product.galery.map((url) => (
              <img
                src={url}
                key={uuid()}
                style={{ width: '30vh', margin: '0.3em' }}
              />
            ))}
          </span>

          <h5>£{product.price}</h5>
          <AddToBasket product={product} />
          {renderOptions()}
        </div>
      );
  };
  return <span>{renderProducts()}</span>;
};

export default ShowProduct;
