'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

export default function CartPage() {
  const { cart, cartTotal, itemCount } = useCart();

  return (
    <div className="page-main">
      <div className="page-container">
        <h1 className="cart-page-title">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p style={{ marginBottom: '24px' }}>
              Add some products before proceeding to checkout.
            </p>
            <Link href="/" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left: items list */}
            <div>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            </div>

            {/* Right: summary */}
            <div className="cart-summary-box">
              <h2 className="cart-summary-title">Order Summary</h2>
              <div className="cart-summary-row">
                <span>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
                <span>LKR {cartTotal.toLocaleString()}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span>LKR {cartTotal.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                id="proceed-to-checkout-btn"
                className={`btn btn-primary btn-full${cart.length === 0 ? ' btn-disabled' : ''}`}
                style={cart.length === 0 ? { pointerEvents: 'none', opacity: 0.45 } : {}}
              >
                Proceed to Checkout
              </Link>

              <Link href="/" className="btn btn-outline btn-full" style={{ marginTop: '10px' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
