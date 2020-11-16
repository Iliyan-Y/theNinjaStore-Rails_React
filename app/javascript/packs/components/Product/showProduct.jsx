import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './deleteProduct';
import EditProduct from './editProduct';
import { useCookies } from 'react-cookie';

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

    checkForUser();
  }, []);

  let checkForUser = () => {
    let token = cookies.user_token;
    axios
      .get('/api/v1/users/verify', {
        headers: {
          'token': token,
        },
      })
      .then((res) => (res.status == 200 ? setIsUser(true) : ''))
      .catch((err) => console.error(err.message));
  };

  let renderOptions = () => {
    if (isUser)
      return (
        <div>
          <DeleteProduct productId={productId} />
          <EditProduct product={product} />
        </div>
      );
  };

  let renderProducts = () => {
    if (product)
      return (
        <>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>£{product.price}</p>
          <img src={product.image} alt="" style={{ width: '250px' }} />
          {renderOptions()}
        </>
      );
  };
  return <span>{renderProducts()}</span>;
};

export default ShowProduct;
