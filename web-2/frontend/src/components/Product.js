
import {Card,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product({product}){
    
    console.log(product ,"from product");

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      cart: { cartItems },
    } = state;
    const addToCartHandler = async (item) => {
         const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
          window.alert('Sorry, this item is out of stock');
          return;
        }
    
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...item, quantity },
        });
      };
    


    return (
        <Card style={{ height: '620px' }}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="danger" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button
              className="btn-primary "
              onClick={() => addToCartHandler(product)}
            >
              Add To Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    );
}

export default Product; 