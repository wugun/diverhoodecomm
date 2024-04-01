import React from 'react'
import { useState } from "react";

import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { Recommended, Sidebar, Product } from '../components';

const Shop = ({products, categoryNames}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // ----------- Input Filter -----------
    const [query, setQuery] = useState("");
  
    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    const filteredItems = products.filter(
      (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  
    // ----------- Radio Filtering -----------
    const handleChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    // ------------ Button Filtering -----------
    const handleClick = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    function filteredData(products, selected, query) {
      let filteredProducts = products;
  
      // Filtering Input Items
      if (query) {
        filteredProducts = filteredItems;
      }
  
      // Applying selected filter
      if (selected) {
        filteredProducts = filteredProducts.filter(
          ({ category, colors, price }) =>
            category === selected ||
            colors === selected ||
            price < selected 
        );
      }
  
      return filteredProducts.map(
        (product) => <Product key={product._id} product={product}/>
      );
    }
  
    const result = filteredData(products, selectedCategory, query);
  
    return (
      <>
        <Sidebar handleChange={handleChange} />
        
        <Recommended handleClick={handleClick} />
        <div className="products-container">
            {result}
        </div>
      </>
    );
}

export const client = createClient({
    projectId: 'w0mar7hm',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true
  });
  
  const builder = imageUrlBuilder(client);
  
  export const urlFor = (source) => builder.image(source);
  
  export const getStaticProps = async () => {
    const products = await client.fetch(`*[_type == "product"]`);
    const categoryIds = products.map(product => product.category._ref);
    const categoryNames = await client.fetch(`*[_id in $categoryIds][].name`, { categoryIds });
    
    return {
      props: {
        products, categoryNames
      }
    };
  }

export default Shop
