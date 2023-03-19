import React, { useReducer, useEffect, useState } from "react";
import { Findproducts, GetAllOrders } from "../apiCalls.js";
import { reduceItemQuantity, addItemToCart, removeItem } from './Store.js';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle, faXmark } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  cart: [],
  loading: true,
  emptyCart: false
};

const reducer = (state, action) => {
  switch (action.type) {
      case 'SET_CART':
          return { ...state, cart: action.payload };
      case 'SET_LOADING':
        return { ...state, loading: true };
      case 'SET_LOADED':
        return { ...state, loading: false };
      case 'SET_EMPTY_TRUE':
        return { ...state, emptyCart: true };
      case 'SET_EMPTY_FALSE':
        return { ...state, emptyCart: false };
      default:
          return state;
  }
}

export const Cart = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});

  const handlePlus = (item, target) => {
    addItemToCart(item, target);
    target.disabled = true;
    setQuantities({ ...quantities, [item.product.id]: (quantities[item.product.id] || 0) + 1 });
    setSubTotal(subTotal + item.product.price);
    target.disabled = false;
  }
  
  const handleMinus = (item, target) => {
    reduceItemQuantity(item, target);
    target.disabled = true;
    if (quantities[item.product.id] != 1) {
      setSubTotal(subTotal - item.product.price);
    }
    setQuantities({ ...quantities, [item.product.id]: Math.max(1, quantities[item.product.id] - 1) });
    target.disabled = false;
  }
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_CART' });
      dispatch({ type: 'SET_LOADING' });
      const payload = []
      try {
        if (localStorage.getItem('logged') && localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== '') {
          const result = await GetAllOrders(localStorage.getItem('userId'));
          if (result) {
            const promises = result.orderItems.map(async elm => {
              const productFetch = await Findproducts({ "id": elm.id });
              return {
                id: elm.id,
                quantity: elm.quantity,
                product: productFetch[0]
              };
            });
            const payload = await Promise.all(promises);
            const newQuantities = {};
            payload.forEach(item => {
              newQuantities[item.product.id] = item.quantity;
            });
            setQuantities(newQuantities);
            dispatch({ type: 'SET_CART', payload: payload });
            setSubTotal(payload.reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
            dispatch({ type: 'SET_LOADED' })
          }
        }
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTax(subTotal * 0.06);
    setTotal(subTotal + subTotal * 0.06);
  }, [subTotal]);
  
  return (
    <div className="content-area">
      {state.loading ? <div className='emptyCart'><p>loading..</p></div> :
        (state.emptyCart ?
          <div className='emptyCart'>
            <p>It seems like your cart is empty.</p>
            <p>Treat your self to our</p>
            <p><span>Fancy Shoes!</span></p>
            <Link to="/products"><button className="btn btn-primary">Shop now</button></Link>
          </div> :
          <div className="cart-page">
            <div className="cart-items">
              <h2>Your Cart</h2>
              <hr />
              {state.cart.map(item => (
              <div key={item.product.id} className="cart-card">
                <div className="cart-card-body">
                  <div className="cart-card-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="cart-card-content">
                    <h3 className="cart-card-title"><strong>{item.product.name}</strong></h3>
                    <p className="cart-card-price"><strong>Price: </strong>{item.product.price}$</p>
                      <div className="cart-card-quantity">
                      <strong>Quantity: </strong>
                      <button className="left" onClick={(event) => handleMinus(item, event.target)}><FontAwesomeIcon icon={faMinusCircle} /></button>
                      <span>{quantities[item.product.id]}</span>
                      <button onClick={(event) => handlePlus(item, event.target)}><FontAwesomeIcon icon={faPlusCircle} /></button>
                    </div>
                  </div>
                  <div className="cart-card-remove">
                    <button onClick={(event) => removeItem(item,event.target)}><FontAwesomeIcon icon={faXmark}/></button>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <div className="order-details">
              <h2>Order Details</h2>
              <hr />
              <div className="order-texts">
                <p>Subtotal:</p>
                <span>{subTotal.toFixed(2)}$</span>
                <p>Tax:</p>
                <span>{tax.toFixed(2)}$</span>
                <p>Total:</p>
                <span>{total.toFixed(2)}$</span>
                <button>Checkout</button>
              </div>
            </div>
          </div>
      )}
    </div>
  )
};