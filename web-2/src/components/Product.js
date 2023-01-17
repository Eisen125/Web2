


export const Product = ({product, index}) => {

    // const product_map = product.map(product =>product.images)
    let image = ''
    let title = ''
    console.log(product);
    //if (product[index] != undefined) {
        image = product.images[0];
        title = product.title;
    //}
    return (
        <>
            <div><img src={image}></img></div>
            <div>{title}</div>
        </>
    )
}