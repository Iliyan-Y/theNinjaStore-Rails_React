import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './deleteProduct';
import EditProduct from './editProduct';
import { useCookies } from 'react-cookie';

//local
import { checkForUser } from '../../helpers/checkForUser';
import AddToBasket from '../Basket/addToBasketBtn';
import RenderGallery from './renderGallery';

const ShowProduct = ({ match }) => {
  const {
    params: { productId },
  } = match;
  let [product, setProduct] = useState();
  const [cookies] = useCookies();
  let [isUser, setIsUser] = useState(false);

  let fetchProductData = () => {
    axios
      .get('/api/v1/products/' + productId)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    fetchProductData();
    let token = cookies.user_token;
    checkForUser(token, setIsUser);
  }, []);

  let renderOptions = () => {
    if (isUser.admin)
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
        <div style={outerDiv}>
          <h4 style={{ fontFamily: 'Gill Sans, sans-serif' }}>
            {product.name}
          </h4>
          <span style={firstInnerSpan}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '35vh' }}
            />
            <p style={{ width: '50vh', margin: '0 auto', padding: '0.3em' }}>
              {product.description}
            </p>
          </span>
          <RenderGallery product={product} />
          <h5>£{product.price}</h5>
          <AddToBasket product={product} />
          {renderOptions()}
        </div>
      );
  };
  return <span>{renderProducts()}</span>;
};

export default ShowProduct;

let outerDiv = {
  padding: '1em',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

let firstInnerSpan = {
  display: 'flex',
  alignSelf: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginBottom: '1em',
};
