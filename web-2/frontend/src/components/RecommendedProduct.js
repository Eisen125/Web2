import axios from 'axios';
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { Store } from '../Store';
import { getError } from '../util';
import Product from './Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    default:
      return state;
  }
};

const RecommendedProduct = () => {
  const { cartItems } = useContext(Store);
  const [recommendedProduct, setRecommendedProduct] = useState(false);
  const cartProductIds = cartItems.map((item) => item.id);
  const cpc = cartItems.map((item) => item.category);
  const RandCategory = cpc[Math.floor(Math.random() * cpc.length)];

  const [{ error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page='1'&query='all'&category=${RandCategory}&price='all'&rating=$'all'&order='newest'`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {}
    };
    fetchData();
  }, [error, RandCategory]);

  useEffect(() => {
    products.then((result) => {
      setRecommendedProduct(false);
      result.data.some((product) => {
        if (!cartProductIds.includes(product.id)) {
          setRecommendedProduct(product);
          return true;
        }
        return false;
      });
    });
  }, [products, cartProductIds]);

  if (recommendedProduct) {
    return <Product product={recommendedProduct}></Product>;
  }
};

export default RecommendedProduct;
