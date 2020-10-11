import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowProduct = () => {
  // useEffect(() => {
  //   axios
  //   .get('/api/v1/products/'+ id)
  //   .then((res) => setProduct(res.data))
  //   .catch((err) => console.log(err.message));
  // }, [])

  return (
    <span>
      <h1>HELOOOO SHOW</h1>

      {/* <p>{product.name}</p>
    <p>{product.description}</p>
    <p>£{product.price}</p>
    <img src={product.image} alt="" style={{ width: "250px" }} /> */}
    </span>
  );
};

export default ShowProduct;
