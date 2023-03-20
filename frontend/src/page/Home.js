import React, { Row, Col, useState, useEffect } from "react";
import { useReducer } from "react";
import { Findproducts } from "../apiCalls.js";
import '../styles/Home.css';
import { Slider } from "../components/Slider";

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
      dispatch({ type: 'SET_NOW_TRENDING' });
      dispatch({ type: 'SET_BEST_SELLING' });
      dispatch({ type: 'SET_LOADING' });
      const payload = []
      try {
        
        const result = await Findproducts();

        result.forEach(elm => {
          payload.push({
            image: elm.image,
            id: elm.id,
            name: elm.name,
            views: elm.views,
            price: elm.price,
            description: elm.description,
            category: elm.category,
            brand: elm.brand,
            purchased: elm.purchased
          })
        });
        //}
       
        dispatch({ type: 'SET_RECENTLY_VIEWED', payload: payload.slice(0, 20) });
        dispatch({ type: 'SET_NOW_TRENDING', payload: payload.slice().sort((item1, item2) => item2.views - item1.views).slice(0, 20) });
        dispatch({ type: 'SET_BEST_SELLING', payload: payload.slice().sort((item1, item2) => item2.purchased - item1.purchased).slice(0, 20) });
        dispatch({ type: 'SET_LOADED' })
        /*console.log(state.recentlyViewed);
        console.log( 'payload',JSON.parse(payload));
        const featured = await axios.get('api/products');
         
          featured.data.forEach((elm)=>{payload.push(elm)})
        
        dispatch({ type: 'FETCH_SUCCESS', payload: payload });
      */} catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="home-container content-area">
      <Slider name={'Recently Viewed'} array={state.recentlyViewed} loading={state.loading} />
      <Slider name={'Now Trending'} array={state.nowTrending} loading={state.loading} />
      <Slider name={'Best Selling'} array={state.bestSelling} loading={state.loading} />
    </div>
  );
};