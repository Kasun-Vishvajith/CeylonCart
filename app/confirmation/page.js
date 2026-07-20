'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { generateOrderId } from '@/lib/orderId';

export default function ConfirmationPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [orderId] = useState(() => generateOrderId());
  const [checkoutData, setCheckoutData] = useState(null);
  const [snapshot, setSnapshot] = useState([]);
  const [snapshotTotal, setSnapshotTotal] = useState(0);

  useEffect(() => {
    // Take snapshot of cart before clearing
    const cartSnapshot = [...cart];
    const totalSnapshot = cartTotal;
    setSnapshot(cartSnapshot);
    setSnapshotTotal(totalSnapshot);

    // Load checkout info
    let checkoutInfo = null;
    try {
      const stored = localStorage.getItem('ceyloncart_checkout');
      if (stored) {
        checkoutInfo = JSON.parse(stored);
        setCheckoutData(checkoutInfo);
      }
    } catch {}

    // Persist order to admin orders list
    try {
      const order = {
        orderId,
        placedAt: new Date().toISOString(),
        customerName: checkoutInfo?.fullName ?? 'Guest',
        email: checkoutInfo?.email ?? '',
        address: checkoutInfo
          ? `${checkoutInfo.address}, ${checkoutInfo.city}`
          : '',
        items: cartSnapshot,
        itemCount: cartSnapshot.reduce((s, i) => s + i.quantity, 0),
        total: totalSnapshot,
      };
      const existing = JSON.parse(localStorage.getItem('ceyloncart_orders') || '[]');
      // Prevent duplicate inserts (happens in React Strict Mode Dev because useEffect runs twice)
      const isDuplicate = existing.some((o) => o.orderId === order.orderId);
      if (!isDuplicate) {
        localStorage.setItem('ceyloncart_orders', JSON.stringify([order, ...existing]));
      }
    } catch {}

    // Clear cart and checkout data
    clearCart();
    localStorage.removeItem('ceyloncart_checkout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-main">
      <div className="page-container">
        <div className="confirmation-card">
          {/* Header */}
          <div className="confirmation-header">
            <div className="confirmation-icon">&#10003;</div>
            <h1 className="confirmation-title">Order Confirmed</h1>
            <p className="confirmation-subtitle">
              Thank you for your purchase. Your order is on its way.
            </p>
            <div className="confirmation-order-id">{orderId}</div>
          </div>

          {/* Body */}
          <div className="confirmation-body">
            {/* Delivery address */}
            {checkoutData && (
              <>
                <p className="confirmation-section-title">Deliver to</p>
                <div className="confirmation-address">
                  <strong>{checkoutData.fullName}</strong>
                  <br />
                  {checkoutData.address}
                  <br />
                  {checkoutData.city}
                  <br />
                  {checkoutData.phone}
                  <br />
                  {checkoutData.email}
                </div>
              </>
            )}

            {/* Items */}
            <p className="confirmation-section-title">Items Ordered</p>
            <div className="confirmation-items">
              {snapshot.map((item) => (
                <div key={item.productId} className="confirmation-item">
                  <span>
                    {item.name}{' '}
                    <span style={{ color: 'var(--text-muted)' }}>x{item.quantity}</span>
                  </span>
                  <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="confirmation-total">
              <span>Total Paid</span>
              <span>LKR {snapshotTotal.toLocaleString()}</span>
            </div>

            <Link
              href="/"
              id="back-to-home-btn"
              className="btn btn-primary btn-full"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
