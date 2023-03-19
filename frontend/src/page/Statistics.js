import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import '../styles/Statistics.css';
import { Findproducts } from '../apiCalls';

export const Statistics = () => {
  const [mostPopularCategories, setMostPopularCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Findproducts();
      if (data) {
        const brandData = {};
        data.forEach(product => {
          if (brandData[product.brand]) {
            brandData[product.brand] += product.purchased;
          } else {
            brandData[product.brand] = product.purchased;
          }
        });
        const barData = Object.entries(brandData).map(([brand, purchased]) => ({ brand, purchased }));
        setData(barData);
      }
    };    
    fetchData();
  }, []);
  
  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(d => d.brand));
  
    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, d => d.purchased)]);
  
      const svg = d3.select(svgRef.current);

      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.brand))
        .attr("y", d => y(d.purchased))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.purchased))
        .attr("fill", "steelblue");
      
      const xAxis = d3.axisBottom(x);
      svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .attr("transform", `translate(0,${height})`);
      
      const yAxis = d3.axisLeft(y);
      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);
      
  
  }, [data]);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;
  
  const x = d3.scaleBand()
  .range([0, width])
  .padding(0.1)
  .domain(data.map(d => d.brand));

  const y = d3.scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(data, d => d.purchased || 0)]);


if (!data || data.length === 0) {
  return <div>No data available</div>;
  }
  
return (
  <div className='content-area'>
    <div className='chart-container'>
    <h2 className='chart-title'>Sales by Brand</h2>
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {data.map(d => (
          <rect
            key={d.brand}
            x={x(d.brand)}
            y={y(d.purchased)}
            width={x.bandwidth()}
            height={height - y(d.purchased)}
            fill="#008491"
          />
        ))}
        <g transform={`translate(0, ${height})`} ref={node => d3.select(node).call(d3.axisBottom(x))} />
        <g ref={node => d3.select(node).call(d3.axisLeft(y))} />
      </g>
      </svg>
    </div>
  </div>
);    
};