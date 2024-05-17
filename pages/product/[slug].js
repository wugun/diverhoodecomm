import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '@/pages';
import { Product } from '../../components';
import Link from 'next/link';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, productUrl } = product;
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        
        <div className="w-3/4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="reviews">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            <p>
              (20)
            </p>
          </div>
          <h4 className="font-semibold">Details: </h4>
          <p>{details}</p>
          <p className="text-lg font-semibold">${price}</p>
         
          <div className="buttons space-x-4">
            <button type="button" className="add-to-cart" >Add to Cart</button>
            <Link href={productUrl ?? ''}>
                <button className="buy-now">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails