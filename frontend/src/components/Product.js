import React, { useReducer, useEffect,createContext, useContext, useState} from "react";
import {Findproducts} from '../apiCalls'
import { useLocation } from 'react-router-dom';
import { MyContext } from '../page/Store.js';

const initialState={
  productInfo:[],
  loading:true,

}
const reducer=(state,action)=>{
  switch(action.type){
    case 'SET_PRODUCT_INFO':
      return{...state,productInfo:action.payload}
    case 'SET_IS_LOADING':
      return {...state,loading:true} 
      case 'SET_LOADED':
        return { ...state, loading: false};  
    default:
      return state;
  }
}

export const Product = () => {
  const { value, updateValue } = useContext(MyContext);
 console.log(updateValue);
   const [state,dispatch]=useReducer(reducer, initialState);
   useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_PRODUCT_INFO' });
      
      dispatch({ type: 'SET_IS_LOADING' });
      const payload = []
      try {
          const result = await Findproducts()
          result.forEach(elm => {
            payload.push({
              image: elm.image,
              name: elm.name,
              price: elm.price,
              description: elm.description,
              catagory: elm.category,
              brand: elm.brand
            })
          });
          dispatch({ type: 'SET_PRODUCT_INFO', payload: payload });
        dispatch({type: 'SET_LOADED'})
        } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);


 console.log(state);
    
  return (
    <div>
    
</div>
);
    
}

