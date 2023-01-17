import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Cols,Row,Rows } from "react-bootstrap"
import { Product } from '../components/Product';






 export const HomeScreen=()=>{
  
  const [product_list,setProducts]=useState([])

  useEffect(()=>{
      const fetchProducts=async()=>{
          const result= await axios.get('https://dummyjson.com/products')
          setProducts(result.data.products) 

      }
      fetchProducts()
    },[])

  console.log(product_list ,"hey");
  const products= product_list.map(product => product.title)
  console.log(products)
return(
<div>
<div><title>Shosi shose</title></div>
  <Row>

  <Product product={product_list}></Product>
  
  </Row>
 
</div>)

}
