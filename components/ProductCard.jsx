'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { id, name, category, price, image } = product;

  return (
    <Link href={`/product/${id}`} className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={image}
          alt={name}
          className="product-card-image"
          width={400}
          height={400}
        />
        <span className="product-card-category">{category}</span>
      </div>
      <div className="product-card-body">
        <h2 className="product-card-name">{name}</h2>
        <p className="product-card-price">LKR {price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
