


export const Product = ({product, index}) => {

    // const product_map = product.map(product =>product.images)
    let image = ''
    let title = ''
    if (product[index] != undefined) {
        image = product[index].images[0];
        title = product[index].title;
    }
    return (
        <div>
            <div><img src={image}></img></div>
            <div>{title}</div>
        </div>
    )
}