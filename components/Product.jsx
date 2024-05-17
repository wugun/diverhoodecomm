import React from 'react';

import Link from 'next/link';
import { urlFor } from '@/pages';

const Product = ({product: {image, name, slug, price}}) => {
  // Safely handle the slug.current value
  const productSlug = slug?.current ?? '';

  // Avoid rendering the link if productSlug is empty
  if (!productSlug) {
    return <p>Product link is not available</p>;
  }

  return (
    <div>
      <Link href={`/product/${productSlug}`}>
        <div className="product-card">
            <img src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
            />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
