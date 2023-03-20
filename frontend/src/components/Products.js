import React from 'react'
import { useReducer,useEffect } from "react"; 
import {Findproducts} from "../apiCalls.js"
import { Slider } from "../components/Slider";


const initialState = {
  allProducts: [],
  loading: true,
};
const reducer = (state, action) => {
  switch (action.type) {
      case 'SET_ALL_PRODUCTS':
          return { ...state, allProducts: action.payload }; 
      case 'SET_LOADING':
        return { ...state, loading: true };
      case 'SET_LOADED':
        return { ...state, loading: false };
      default:
          return state;
  }
}
export const Products = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_ALL_PRODUCTS' });
      
      dispatch({ type: 'SET_LOADING' });
      const payload = []
      try {
          const result = await Findproducts()
          result.forEach(elm => {
            payload.push({
              image: elm.image,
              id: elm.id,
              name: elm.name,
              views: elm.views,
              price: elm.price,
              description: elm.description,
              category: elm.category,
              brand: elm.brand
            })
          });
          dispatch({ type: 'SET_ALL_PRODUCTS', payload: payload });
        dispatch({type: 'SET_LOADED'})
        } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div className='content-area'>
      <Slider name={'all products'} array={state.allProducts} loading={state.loading} ></Slider>
    </div>
  )
}
