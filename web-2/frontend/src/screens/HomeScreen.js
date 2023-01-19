import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';
import '../components/Product.js'
import Product from '../components/Product.js';

function HomeScreen(){
  const[products,setProducts]=useState([])
  useEffect(()=>{
    const fetchProducts=async()=>{
        const result= await axios.get('https://dummyjson.com/products')
        setProducts(result.data.products);
        console.log(products);
        
    }
    fetchProducts()
},[])


return(
    <div>
      <h1>Shoes Store</h1>
      <Row>
      {products.map(item=>{
       return <Col key={item.id} sm={6} md={4} lg={2} className="mb-3">
          <Product product={item}></Product>
        </Col>
      })}
      </Row>
   
    
    </div>
    );


}


export default HomeScreen;