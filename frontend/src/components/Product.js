import React, { useReducer, useEffect,createContext, useContext, useState} from "react";
import {Findproducts} from '../apiCalls'
import { useParams } from 'react-router-dom';
import { MyContext } from '../page/Store.js';
import { addItemToCart } from "../page/Store.js";
import '../styles/SingleProduct.css';

const initialState={
  featuredProducts:[],
  loading:true,

}
const reducer=(state,action)=>{
  switch(action.type){
    case 'SET_PRODUCT':
    return { ...state, product: action.payload };
    case 'SET_IS_LOADING':
      return {...state,loading:true} 
      case 'SET_LOADED':
        return { ...state, loading: false};  
    default:
      return state;
  }
}
let i=[]
export const Product = () => {
  const { id } = useParams();
  const { value, updateValue } = useContext(MyContext);
  const [state,dispatch]=useReducer(reducer, initialState);
  
   useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_PRODUCT' });
      dispatch({ type: 'SET_IS_LOADING' });      
      const payload = []
      try {
        const result = await Findproducts({"id":id});
        if(result){
          const promises=result.map( elm=>{
            return {image: elm.image,
              id: elm.id,
              name: elm.name,
              views: elm.views,
              price: elm.price,
              description: elm.description,
              category: elm.category,
              brand: elm.brand,
              purchased: elm.purchased}
          })
          const payload= await Promise.all(promises)
          dispatch({ type: 'SET_PRODUCT', payload: payload[0]});
        }
         
          dispatch({type: 'SET_LOADED'})
        } catch (error) {
          dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="content-area">
      {state.loading ? (
        <div className="single-product-empty">
          <h2>loading...</h2>
        </div>
      ) : state.product.length === 0 ? (
        <div className="single-product-empty">
          <p>no item selected</p>
        </div>
      ) : (
        <div className="single-product-page">
          <div className="single-product-title-container">
          <h2 className="single-product-title">{state.product.name}</h2>
        </div>
        <div className="single-product-left">
          <img className="single-product-img" src={state.product.image} alt=""></img>
          <p className="single-product-price">price:{state.product.price}$</p>
        </div>
        <div className="single-product-right">
          <p className="single-product-info">{state.product.description}</p>
        </div>
        <div className="single-product-btn-container">
          <button className="single-product-btn btn-primary" onClick={(event)=>{addItemToCart(state.product,event.target)}}>Add to cart</button>
        </div>
      </div>

      )}
    </div>
  );
}

