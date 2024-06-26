import React from 'react';
import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';

import { Slider, Product, Showcase, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <main className="bg-gray-300 rounded-2xl w-full min-h-screen mx-auto grid place-items-center">
        <Slider heroSlider={bannerData}/>
      </main>
      {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}/> */}

      <div className="products-heading">
        <h2>Diver Community Showcase</h2>
        <p>Get inspired by AI-powered furniture designs from other divers</p>
      </div>
      
      <Showcase />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Shop selected furniture from indie sellers</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
};

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
  const bannerData = await client.fetch(`*[_type == "banner"]`);
  
  return {
    props: {
      products, bannerData
    }
  };
}

export default Home;
