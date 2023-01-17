import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Cols,Row,Rows } from "react-bootstrap"
import { Product } from '../components/Product';






export const HomeScreen = () => {
  
  const [product_list, setProducts] = useState([])
  let products = [];

  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get('https://dummyjson.com/products').then((result) => {
        setProducts(result.data.products);
        products = product_list.map(product => product.title)
      });
    }
    fetchProducts()
  }, [])

  /*console.log(product_list, "hey");
  
  console.log(products)*/
  return (
    <div>
      <div><title>Shosi shose</title></div>
      <Row>
        
        <Product index={0} product={product_list}></Product>

      </Row>
 
    </div>)

}