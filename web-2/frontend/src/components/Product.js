
import {Card,Button} from 'react-bootstrap';
function Product({product}){

console.log(product + "this is from product");

    return (
        <Card style={{ MaxHeight: '50px' }}>
        <img src={product.images[0]} className="card-img-top" alt='' />
      < Card.Body>
          <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="danger" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            className="btn-primary ">
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
    
    )
}

export default Product;