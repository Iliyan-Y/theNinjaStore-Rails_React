import React from 'react';
import { v4 as uuid } from 'uuid';

const RenderGallery = ({ product }) => {
  return (
    <span>
      {product.galery.map((url) => (
        <img
          src={url}
          key={uuid()}
          style={{ width: '30vh', margin: '0.3em' }}
        />
      ))}
    </span>
  );
};

export default RenderGallery;
