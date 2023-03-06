import React, { useState } from 'react'
import { ProductCard } from './ProductCard'
import '../styles/Slider.css'

export const Slider = ({ name, array, loading }) => {
    
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    function slide(direction) { // 0 is left 1 is right
        if (direction == 0) {
            setStart(Math.max(0, start - 1));
            setEnd(Math.max(0, end - 1));
            return;
        }
        setStart(Math.min(start + 1, array.length - 1));
        setEnd(Math.min(end + 1, array.length - 1));
        return;
    }
    return (
    <div>
        <h2>{ name }</h2>
        <div className="row product-slider">
            {!loading ? <button className='prev-button' onClick={()=>slide(0)} style={{ visibility: start === 0 ? 'hidden' : 'visible' }}/> : ''}        
            {!loading ? array.slice(start,end).map((product) => (
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
                {!loading ? <button className='next-button' onClick={()=>slide(1)} style={{ visibility: end === (array.length - 1) ? 'hidden' : 'visible' }}/> : ''}
        </div>
    </div>
  )
}
