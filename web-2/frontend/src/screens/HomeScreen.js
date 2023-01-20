import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';
import '../components/Product.js'
import Product from '../components/Product.js';
import { useReducer } from 'react';
import logger from 'use-reducer-logger';





const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};



function HomeScreen(){
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const[productsArr,setProducts]=useState([])
  useEffect(()=>{
    const fetchProducts=async()=>{
        const result= await axios.get('https://dummyjson.com/products')
        setProducts(result.data.products);
        console.log(products);
        
    }
    fetchProducts()
},)


return(
    <div>
      <h1>Cool Shoes Store</h1>
      <Row>
      {productsArr.map(item=>{
       return <Col key={item.id} sm={6} md={4} lg={2} className="mb-3">
          <Product product={item}></Product>
        </Col>
      })}
      </Row>
   
    
    </div>
    );


}


export default HomeScreen;