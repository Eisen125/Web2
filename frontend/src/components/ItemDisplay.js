import React, { useState } from 'react'
import { ProductCard } from './ProductCard'
import '../styles/ItemDisplay.css'

export const ItemDisplay = ({ name, array, loading }) => {

    return (
    <div>
        <h2 className='product-display-title'>{ name }</h2>
        <div className="row row-display product-display">
            {!loading ? array.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-5 p-3">
            <ProductCard
                key={product.id}
                product={product}
                className="product-shadow"
                onHover={() => {/* handle hover event */}}
                onLeave={() => {}}
            />
            </div>
            )) : <h6>loading..</h6>}
            </div>
    </div>
  )
}