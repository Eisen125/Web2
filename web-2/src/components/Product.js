


export const Product = ({product})=>{
  
// const product_map = product.map(product =>product.images)
    return(
        <div>
        
        <img src={product[0].images[0]}></img>
        </div>
        )


}