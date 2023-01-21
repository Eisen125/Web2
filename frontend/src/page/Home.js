import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ProductCard } from '../components/ProductCard';


export const Home = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [nowTrending, setNowTrending] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    // Get recently viewed products
    const recentlyViewedProducts = products.filter(
      (product) => product.recentlyViewed
    );
    setRecentlyViewed(recentlyViewedProducts);

    // Get now trending products
    const nowTrendingProducts = products.filter((product) => product.recentlyBought);
    setNowTrending(nowTrendingProducts);

    // Get best selling products
    const bestSellingProducts = products.sort((a, b) => b.numBought - a.numBought);
    setBestSelling(bestSellingProducts);
  }, [products]);

  
  return (
    <div className="home-container">
            <h2>Recently Viewed</h2>
      <div className="product-slider">
        {recentlyViewed.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="product-shadow"
            onHover={() => {/* handle hover event */}}
          />
        ))}
      </div>

      <h2>Now Trending</h2>
      <div className="product-slider">
        {nowTrending.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="product-shadow"
            onHover={() => {/* handle hover event */}}
          />
        ))}
      </div>

      <h2>Best Selling</h2>
      <div className="product-slider">
        {bestSelling.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className="product-shadow"
            onHover={() => {/* handle hover event */}}
          />
        ))}
      </div>
    </div>
  );
};

