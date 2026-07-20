'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import products from '@/data/products.json';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, qty);
    setToast(`${product.name} added to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="page-main">
      <div className="page-container">
        <Link href="/" className="back-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to catalogue
        </Link>

        <div className="product-detail">
          {/* Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
              width={600}
              height={600}
            />
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <p className="detail-category">{product.category}</p>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">LKR {product.price.toLocaleString()}</p>
            <p className="detail-description">{product.description}</p>

            <hr className="detail-divider" />

            {/* Quantity selector */}
            <div className="qty-control">
              <span className="qty-label">Quantity</span>
              <div className="qty-stepper">
                <button
                  className="qty-stepper-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-stepper-val">{qty}</span>
                <button
                  className="qty-stepper-btn"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              id="add-to-cart-btn"
              className="btn btn-primary btn-full"
              onClick={handleAddToCart}
            >
              Add to Cart — LKR {(product.price * qty).toLocaleString()}
            </button>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast">{toast}</div>
        </div>
      )}
    </div>
  );
}
