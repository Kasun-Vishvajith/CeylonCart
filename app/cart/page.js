'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 10000;
const SHIPPING_FEE = 450;

export default function CartPage() {
  const { cart, cartTotal } = useCart();

  const { shipping, total } = useMemo(() => {
    const shippingAmount = cartTotal >= FREE_SHIPPING_THRESHOLD || cart.length === 0
      ? 0
      : SHIPPING_FEE;
    return {
      shipping: shippingAmount,
      total: cartTotal + shippingAmount,
    };
  }, [cart, cartTotal]);

  if (cart.length === 0) {
    return (
      <div className="page-main">
        <div className="page-container">
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Add a few Ceylon favorites to get started.</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-main">
      <div className="page-container">
        <h1 className="cart-page-title">Your Cart</h1>

        <div className="cart-layout">
          <section className="cart-items-list" aria-label="Cart items">
            {cart.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))}
          </section>

          <aside className="cart-summary-box" aria-label="Order summary">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>LKR {cartTotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? 'Free' : `LKR ${shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>LKR {total.toLocaleString()}</span>
            </div>

            <Link href="/checkout" id="proceed-to-checkout-btn" className="btn btn-terra btn-full">
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="btn btn-outline btn-full"
              style={{ marginTop: '10px' }}
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}