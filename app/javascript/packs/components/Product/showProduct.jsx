import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './deleteProduct';
import EditProduct from './editProduct';
import { useCookies } from 'react-cookie';
import { checkForUser } from '../../helpers/checkForuser';

const ShowProduct = ({ match }) => {
  const {
    params: { productId },
  } = match;
  let [product, setProduct] = useState();
  const [cookies] = useCookies();
  let [token, setToken] = useState(cookies.user_token);
  let [isUser, setIsUser] = useState(false);

  useEffect(() => {
    axios
      .get('/api/v1/products/' + productId)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err.message));

    checkForUser(token, setIsUser);
  }, []);

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
