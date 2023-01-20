import { useEffect, useReducer } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';



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

  function AllProductsScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
      products: [],
      loading: true,
      error: '',
    });
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        const payload = []
        try {
          const categories = ["womens-shoes","mens-shoes"]
          categories.forEach(async (catagory)=> {
              const dummyresult = await axios.get('https://dummyjson.com/products/category/'+catagory+'?limit=15');
              dummyresult.data.products.forEach(elm => {
                  payload.push({
                      image: elm.images[0],
                      slug: elm.id,
                      name: elm.title,
                      rating: elm.rating,
                      numReviews: Math.floor(Math.random()* 10000),
                      price: elm.price,
                      countInStock: elm.stock
                  })
               
              });
          })
         
          const featured = await axios.get('api/products');
           
            featured.data.forEach((elm)=>{payload.push(elm)})
          
          dispatch({ type: 'FETCH_SUCCESS', payload: payload });
        } catch (error) {
          dispatch({ type: 'FETCH_FAIL', payload: error.message });
        }
      };
      fetchData();
    }, []);
    return (
      <div>
       
          <title>Cool Shoes Store</title>
        <h1>All Products</h1>
        <div className="products">
            
            <Row>
              {products.map(product => {return (<Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product}></Product>
              </Col>)}
               
                
              )}
            </Row>
        </div>
      </div>
    );
  }
  
  export default AllProductsScreen;
  