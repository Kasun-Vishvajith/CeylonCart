'use client';

const CATEGORIES = ['All', 'Tea', 'Spices', 'Handicrafts', 'Apparel'];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={active === cat}
          className={`filter-tab${active === cat ? ' filter-tab--active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
