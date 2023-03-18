import React from 'react';
import { useContext } from 'react';
import { addItemToCart } from '../page/Store.js';
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
        <p className="card-text">
          <strong>Price:</strong> {product.price}$
        </p>
        <button className="btn btn-primary" onClick={(event)=>{addItemToCart(product,event.target)}}>Add to cart</button>
      </div>
    </div>
  );
};
