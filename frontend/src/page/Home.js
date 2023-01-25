import React, { Row, Col, useState, useEffect } from "react";
import { useReducer } from "react"; 
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';
import '../styles/Home.css'

const initialState = {
  featuredProducts: [],
  recentlyViewed: [],
  nowTrending: [],
  bestSelling: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
      case 'SET_FEATURED_PRODUCTS':
          return { ...state, featuredProducts: action.payload };
      case 'SET_RECENTLY_VIEWED':
          return { ...state, recentlyViewed: action.payload };
      case 'SET_NOW_TRENDING':
          return { ...state, nowTrending: action.payload };
      case 'SET_BEST_SELLING':
          return { ...state, bestSelling: action.payload };
      case 'SET_LOADING':
        return { ...state, loading: true };
      case 'SET_LOADED':
        return { ...state, loading: false };
      default:
          return state;
  }
}

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'SET_RECENTLY_VIEWED' });
      dispatch({ type: 'SET_LOADING' });
      const payload = []
      try {
        
        const categories = ["womens-shoes", "mens-shoes"]
        for (const catagory of categories) {
          const dummyresult = await axios.get('https://dummyjson.com/products/category/' + catagory + '?limit=20');
          dummyresult.data.products.forEach(elm => {
            payload.push({
              image: elm.images[1],
              id: elm.id,
              name: elm.title,
              rating: elm.rating,
              numReviews: Math.floor(Math.random() * 10000),
              price: elm.price,
              countInStock: elm.stock
            })
          })
        }
       
        dispatch({ type: 'SET_RECENTLY_VIEWED', payload: payload });
        dispatch({type: 'SET_LOADED'})
        console.log(state.recentlyViewed);
        /*const featured = await axios.get('api/products');
         
          featured.data.forEach((elm)=>{payload.push(elm)})
        
        dispatch({ type: 'FETCH_SUCCESS', payload: payload });
      */} catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="home-container">
      <h2>Recently Viewed</h2>
      <div className="row product-slider">
            {!state.loading ? state.recentlyViewed.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-5 p-3">
          <ProductCard
            key={product.id}
            product={product}
            className="product-shadow"
            onHover={() => {/* handle hover event */}}
            onLeave={() => {}}
          />
        </div>
            )) : ''}
        </div>
      <h2>Now Trending</h2>
      <div className="product-slider">
        {state.nowTrending.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="product-shadow"
            onHover={() => {/* handle hover event */}}
          />
        ))}
      </div>

      <h2>Best Selling</h2>
      <div className="product-slider">
        {state.bestSelling.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="product-shadow"
            onHover={() => {/* handle hover event */}}
          />
        ))}
      </div>
    </div>
  );
};

