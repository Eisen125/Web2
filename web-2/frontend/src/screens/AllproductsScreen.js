import { useEffect, useReducer } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
// import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/esm/Row';


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
              const dummyresult = await axios.get('https://dummyjson.com/products/category/'+catagory+'?limit=20');
              dummyresult.data.products.forEach(elm => {
                  payload.push({
                      image: elm.images[1],
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
       
        <h1>Cool shoes Store</h1>
        <h2>All Products</h2>
        
        <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}

        </div>
      </div>
    );
  }
  
  export default AllProductsScreen;
  