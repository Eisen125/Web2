import React from 'react';
import { useContext } from 'react';

import axios from 'axios';
import '../styles/ProductCard.css';

export const ProductCard = ({ product, className, onHover }) => {
 
  return (
    <div
      className={`card product-card ${className}`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>Price:</strong> {product.price}
        </p>
        <button className="btn btn-primary">Add to cart</button>
      </div>
    </div>
  );
};
