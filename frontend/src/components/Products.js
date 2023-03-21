
import React, { useState } from 'react'
import { useReducer,useEffect } from "react"; 
import { useParams } from 'react-router-dom';
import {Findproducts, searchProduct} from "../apiCalls.js"
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
let c = (window.sessionStorage.getItem('category')) ? window.sessionStorage.getItem('category') : "";
let b = (window.sessionStorage.getItem('brand')) ? window.sessionStorage.getItem('brand') : "";
let max = (window.sessionStorage.getItem('priceMaxRange')) ? window.sessionStorage.getItem('priceMaxRange') : 500;
let min = (window.sessionStorage.getItem('priceMinRange')) ? window.sessionStorage.getItem('priceMinRange') : 1;
let timeOutMax = null;
let timeOutMin = null;

export const Products = () => {
  const { query } = useParams()
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search,setSearch]=useState(query ? query : '');
  const [category,setCategory]=useState(c);
  const [brand,setBrand]=useState(b);
  const [priceMinRange,setMinRange]=useState(min);
  const [priceMaxRange, setMaxRange] = useState(max);
  
  const handleMinPriceChange = event => {
    const minPrice = Math.min(parseInt(event.target.value), priceMaxRange);
    setMinRange(minPrice);
    clearTimeout(timeOutMin);
    timeOutMin = setTimeout(() => {
      if (priceMinRange <= 10) {
        setMinRange(1);
      }
      window.sessionStorage.setItem('priceMinRange', minPrice);
    }, 500);
  };
  
  const handleMaxPriceChange = event => {
    const maxPrice = Math.max(parseInt(event.target.value), priceMinRange);
    setMaxRange(maxPrice);
    clearTimeout(timeOutMax);
    timeOutMax = setTimeout(() => {
      if (priceMaxRange >= 490) {
        setMaxRange(500);
      }
      window.sessionStorage.setItem('priceMaxRange', maxPrice);
    }, 500);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_ALL_PRODUCTS' });
      
      dispatch({ type: 'SET_LOADING' });
      const payload = []

      try {
        //{'search':search,"category":category,"brand":brand, "priceRange":priceRange}
          const result = (search == category && category == brand && brand == '' && priceMinRange == 1 && priceMaxRange == 500) ? await Findproducts() : await searchProduct(search,category,brand,priceMinRange,priceMaxRange);
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
    <div className="content-area store-page">
      {/* left side */}
      <div className="store-page-left">
        <h4>Category</h4>
        <select value={category} onChange={(e)=>{
          window.sessionStorage.setItem('category',e.target.value);
          setCategory(e.target.value);
        }}>
          <option value="">All</option>
          <option value="womens-shoes">Women Shoes</option>
          <option value="mens-shoes">Men Shoes</option>
          <option value="kids-shoes">Kids Shoes</option>
        </select>
        <hr />
        
        <h4>Brand</h4>
        <select value={brand} onChange={(e)=>{
          window.sessionStorage.setItem('brand',e.target.value);
          setBrand(e.target.value);
        }}>
          <option value="">All</option>
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
        <hr />
        <h4>Price Range</h4>
        <div class="maxPrice-container">
  <label for="maximum">max price: </label>
  <input 
    id="maximum" 
    value={priceMaxRange} 
    type="range" 
    placeholder="Max price" 
    min="1" 
    max="500" 
    onInput={handleMaxPriceChange} 
  />
  <output id="maxOut">{priceMaxRange}</output>
</div>

<div class="minPrice-container">
  <label for="minimumn">min price: </label>
  <input 
    id="minimumn" 
    value={priceMinRange} 
    type="range" 
    placeholder="Mix Price" 
    min="1" 
    max="500" 
    onInput={handleMinPriceChange} 
  />
  <output id="minOut">{priceMinRange}</output>
</div>

      </div>

      {/* right side */}
      <div className="store-page-right">
      <ItemDisplay name={'Store Products'} array={state.allProducts} loading={state.loading} ></ItemDisplay>
      </div>
    </div>
  )
}
