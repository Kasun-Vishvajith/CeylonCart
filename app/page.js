'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import products from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function CataloguePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, searchQuery]);

  const catalogueStats = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = new Set(products.map((item) => item.category)).size;
    const averagePrice = Math.round(
      products.reduce((sum, item) => sum + item.price, 0) / totalProducts
    );

    return {
      totalProducts,
      totalCategories,
      averagePrice,
    };
  }, []);

  return (
    <div className="page-main">
      <div className="page-container">
        {/* ── Premium Hero ── */}
        <div className="hero-section">
          <h1 className="hero-title">
            Discover <strong>Authentic</strong><br />
            Sri Lankan Goods
          </h1>
          <p className="hero-subtitle">
            Hand-picked teas, spices, handicrafts and apparel — sourced directly
            from artisans across the island.
          </p>

          <div className="catalogue-highlights">
            <div className="catalogue-highlight-card">
              <span className="catalogue-highlight-label">Products</span>
              <strong className="catalogue-highlight-value">{catalogueStats.totalProducts}</strong>
            </div>
            <div className="catalogue-highlight-card">
              <span className="catalogue-highlight-label">Categories</span>
              <strong className="catalogue-highlight-value">{catalogueStats.totalCategories}</strong>
            </div>
            <div className="catalogue-highlight-card">
              <span className="catalogue-highlight-label">Avg. Price</span>
              <strong className="catalogue-highlight-value">
                LKR {catalogueStats.averagePrice.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="catalogue-quick-actions">
            <Link href="/cart" className="btn btn-terra">
              View Cart
            </Link>
            <Link href="/login" className="btn btn-outline">
              Sign In for Faster Checkout
            </Link>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="search-bar">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="catalogue-search"
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ── Category Filter ── */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
