'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ORDERS_KEY = 'ceyloncart_orders';

function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat('en-LK', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(null); // null = loading

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      setOrders(stored ? JSON.parse(stored) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const handleClear = () => {
    if (window.confirm('Delete all orders from localStorage? This cannot be undone.')) {
      localStorage.removeItem(ORDERS_KEY);
      setOrders([]);
    }
  };

  return (
    <div className="page-main">
      <div className="page-container">

        {/* Header */}
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">Admin</p>
            <h1 className="admin-title">Orders</h1>
            {orders !== null && (
              <p className="admin-subtitle">
                {orders.length} order{orders.length !== 1 ? 's' : ''} stored locally
              </p>
            )}
          </div>
          <div className="admin-header-actions">
            <Link href="/" className="btn btn-outline">
              Back to Shop
            </Link>
            {orders && orders.length > 0 && (
              <button className="btn btn-terra" onClick={handleClear}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {orders === null && (
          <div className="empty-state">
            <p>Loading orders...</p>
          </div>
        )}

        {/* Empty */}
        {orders !== null && orders.length === 0 && (
          <div className="empty-state">
            <h3>No orders yet</h3>
            <p>
              Complete a checkout flow and the order will appear here. Orders are
              stored in your browser&apos;s localStorage.
            </p>
          </div>
        )}

        {/* Table */}
        {orders && orders.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Items</th>
                  <th>Total (LKR)</th>
                  <th>Placed</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>
                      <span className="admin-order-id">{order.orderId}</span>
                    </td>
                    <td>{order.customerName}</td>
                    <td className="admin-email">{order.email}</td>
                    <td className="admin-center">{order.itemCount}</td>
                    <td className="admin-amount">
                      {Number(order.total).toLocaleString()}
                    </td>
                    <td className="admin-date">{formatDate(order.placedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


      </div>
    </div>
  );
}
