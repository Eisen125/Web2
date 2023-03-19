import React from 'react';
import { addItemToCart } from '../page/Store.js';
import {useState} from 'react'
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../page/Store.js';




export const ProductCard = ({ product, className, onHover }) => {
  const [contextValue, setContextValue] = useState({
    id: product.id,
  });

  const updateContextValue = (updatedValue) => {
    setContextValue(updatedValue);
  };
  return (
    <MyContext.Provider value={{ value: contextValue, updateValue: updateContextValue }}>
    <div className={`card product-card ${className}`} onMouseEnter={onHover} onMouseLeave={onHover}>
       
     <Link className='product-link' to={{ pathname: `/product/${product.id}`}}> 
          <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
      <Link className='product-link' to={{pathname:`/product/${product.id}`}}>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text"> 
          <strong>Price:</strong> {product.price}$
        </p>
        </Link>
     
        <button className="btn btn-primary" onClick={(event)=>{addItemToCart(product,event.target)}}>Add to cart</button>
      </div>
    
    </div>
    </MyContext.Provider>
   
  );
};
