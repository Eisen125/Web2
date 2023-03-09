import { Button } from 'bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';

export const Cart = () => {
  let emptyCart = true;
  return (
    <div className="content-area">
      {emptyCart ? <div className='emptyCart'>
        <p>It seems looks like your cart is empty.</p>
        <p>Treat your self to our</p>
        <p><span>Fancy Shoes!</span></p>
        <Link to="/products"><button className="btn btn-primary">Shop now</button></Link>
      </div> : ''}
    </div>
  )
};