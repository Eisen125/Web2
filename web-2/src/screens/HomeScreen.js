import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { Col,Row,Container, Card } from "react-bootstrap"
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
  {products.map(product => <Container.Column width={5} index={product.id}><Product product={product_list} /></Container.Column>)}
  console.log(products)*/
  return (
    <div>
      <div><h1>Shosi shose</h1></div>
      <Container>
        <Row>
          {
            product_list.map((product, index) => {
              return (
                <Col xs={4} md={4} lg={4} key={index} >
                  <Product product={product}></Product>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>)
  /*return (
    <div>
      <div><h1>Shosi shose</h1></div>
      <Container>
        <Row>
          {product_list.slice(0, 3).map((product, index) => (
            <Col className="d-flex justify-content-around" xs={4} md={4} lg={4} key={index}>
              <Card>
                <Card.Img variant="top" src={product.images[0]} alt={product.title} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>)*/

}