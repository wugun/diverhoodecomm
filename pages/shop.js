import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from "next-sanity";

import { Colors, Styles, Price, Product, Recommend } from '../components';

export const client = createClient({
  projectId: 'w0mar7hm',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true
});

const Shop = ({products}) => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Function to initialize filters based on query parameters
  const initializeFiltersFromQuery = () => {
    const { category, color, style, price } = router.query;
    setSelectedCategory(capitalizeInitials(category) || null);
    setSelectedColor(color || null);
    setSelectedStyle(style || null);
    setSelectedPrice(price || null);
  };

  const capitalizeInitials = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Initialize filters from query parameters when component mounts or when query parameters change
  useEffect(() => {
    initializeFiltersFromQuery();
  }, [router.query]);

  // ----------- Input Filter -----------
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.name.toLowerCase().indexOf(input.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    updateQueryParams({ color: event.target.value });
  };
  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
    updateQueryParams({ style: event.target.value });
  };
  const handlePriceChange = (event) => {
    setSelectedPrice(event.target.value);
    updateQueryParams({ price: event.target.value });
  };

    // ------------ Button Filtering -----------
    const handleClick = (event) => {
      setSelectedCategory(event.target.value);
      updateQueryParams({ category: event.target.value });
    };

  // Function to update query parameters in the URL
  const updateQueryParams = (params) => {
    const currentParams = { ...router.query, ...params };
    router.push({ pathname: router.pathname, query: currentParams });
  };

  async function filteredData(products, selectedCategory, selectedColor, selectedStyle, selectedPrice, input) {
    let filteredProducts = products;

    // Filtering Input Items
    if (input) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selectedCategory && selectedCategory !== "Any") {
     // Fetch the category document based on the selectedCategory string
     console.log(selectedCategory);
     const categoryQuery = `*[_type == "category" && name == $name]`;
     console.log(categoryQuery);
     const categoryDocument = await client.fetch(categoryQuery, { name: selectedCategory });
     console.log(categoryDocument);

     // Filter products by matching the _id of the referenced category
     filteredProducts = filteredProducts.filter(({ category }) => category._ref === categoryDocument[0]._id);
    }
    if (selectedColor && selectedColor !== "Any") {
      filteredProducts = filteredProducts.filter(({ colors }) => colors.includes(selectedColor));
    }
    if (selectedStyle && selectedStyle !== "Any") {
      filteredProducts = filteredProducts.filter(({ styles }) => styles.includes(selectedStyle));
    }
    if (selectedPrice && selectedPrice !== "Any") {
      filteredProducts = filteredProducts.filter(({ price }) => price < selectedPrice );
    }

    return filteredProducts.map(
      (product) => <Product key={product._id} product={product}/>
    );
  }

  useEffect(() => {
    // Call the filteredData function and await its result
    const fetchData = async () => {
      const result = await filteredData(products, selectedCategory, selectedColor, selectedStyle, selectedPrice, input);
      setFilteredResult(result); // Set the filtered result in state
    };

    fetchData();
  }, [selectedCategory, selectedColor, selectedStyle, selectedPrice, input]); // Ensure useEffect runs when any of these state values change

  const [filteredResult, setFilteredResult] = useState([]);

  //const result = filteredData(products, selectedCategory, selectedColor, selectedStyle, selectedPrice,  input);
  //console.log(selectedColor);

  return (
    <>
      <div className="sidebar">
        <Colors value={selectedColor} handleChange={handleColorChange} />
        <Styles handleChange={handleStyleChange} />
        <Price handleChange={handlePriceChange} />
      </div>
      <div className="shop-right-container">
        <Recommend handleClick={handleClick} />
        <div className="shop-right-products-container">
          {filteredResult}
        </div>
      </div>
    </>
  );
}

  
export const getStaticProps = async () => {
  const products = await client.fetch(`*[_type == "product"]`);
  
  return {
    props: {
      products
    }
  };
}

export default Shop;
