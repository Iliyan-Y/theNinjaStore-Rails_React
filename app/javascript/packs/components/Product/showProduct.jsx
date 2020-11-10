import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteProduct from './deleteProduct';
import EditProduct from './editProduct';

const ShowProduct = ({ match }) => {
  const {
    params: { productId },
  } = match;
  let [product, setProduct] = useState();

  useEffect(() => {
    axios
      .get('/api/v1/products/' + productId)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  function renderProducts() {
    if (product)
      return (
        <>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>£{product.price}</p>
          <img src={product.image} alt="" style={{ width: '250px' }} />
          <div>
            <DeleteProduct productId={productId} />
            <EditProduct product={product} />
          </div>
        </>
      );
  }

  return <span>{renderProducts()}</span>;
};

export default ShowProduct;
