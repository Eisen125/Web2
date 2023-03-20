import React, { useReducer, useEffect,createContext, useContext, useState} from "react";
import {Findproducts} from '../apiCalls'
import { useParams } from 'react-router-dom';
import { MyContext } from '../page/Store.js';
import { addItemToCart } from "../page/Store.js";
import { Slider } from "./Slider";

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
  
 console.log( "this is from product",id);
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
          console.log("res",result);
         
          dispatch({type: 'SET_LOADED'})
        } catch (error) {
          dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
 console.log(state.product);

  return (
    <div  className="content-area">
        {state.loading ?
          <div className="product-empty">
            <h2>loading...</h2> </div> :
            (state.product.length==0? <div className="product-empty">
              <p>no item selected</p></div>:
              <div className="product-page">
                <h1>product page</h1>
                <h2 className="product-title">title:{state.product.name}</h2>
                <img className="product=img" src={state.product.image} alt=""></img>
                <p className="product-price">price:{state.product.price}$</p>
                <p className="product-info">description:{state.product.description}</p>
                <button className="btn btn-primary" onClick={(event)=>{addItemToCart(state.product,event.target)}}>Add to cart</button>

              </div> 
              ) 
      }
    </div>
  );
}

