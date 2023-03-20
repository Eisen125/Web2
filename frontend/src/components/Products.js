import React from 'react'
import { useReducer,useEffect } from "react"; 
import {Findproducts} from "../apiCalls.js"
import '../styles/AllProducts.css';
import { ItemDisplay } from './ItemDisplay.js';

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
  //<div className='content-area'>
  //<Slider name={'all products'} array={state.allProducts} loading={state.loading} ></Slider>
  //</div>
  return (
    <div className="content-area store-page">
      {/* left side */}
      <div className="store-page-left">
        <h4>Category</h4>
        <select onChange=''>
          <option value="default">All</option>
          <option value="woman">Women Shoes</option>
          <option value="men">Men Shoes</option>
          <option value="men">Kids Shoes</option>
        </select>
        <hr />
        
        <h4>Brand</h4>
        <select onChange=''>
          <option value="default">All</option>
          <option value="The Warehouse">The Warehouse</option>
          <option value="Sunset">Sunset</option>
          <option value="Maasai Sandals">Maasai Sandals</option>
          <option value="Arrivals Genuine">Arrivals Genuine</option>
          <option value="Sneakers">Sneakers</option>
          <option value="SportyTech">SportyTech</option>
          <option value="TrailMaster">TrailMaster</option>
          <option value="Gentleman's Choice">Gentleman's Choice</option>
          <option value="Cosmo Kicks">Cosmo Kicks</option>
          <option value="Roma">Roma</option>
          <option value="Winter Footwear">Winter Footwear</option>
        </select>
        <hr/>

      </div>

      {/* right side */}
      <div className="store-page-right">
      <ItemDisplay name={'Store Products'} array={state.allProducts} loading={state.loading} ></ItemDisplay>
      </div>
    </div>
  )
}
