'use client';

import { useCart } from '@/context/CartContext';

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();
  const { productId, name, price, image, quantity } = item;
  const lineTotal = price * quantity;

  return (
    <div className="cart-item">
      <img src={image} alt={name} className="cart-item-image" width={80} height={80} />

      <div className="cart-item-info">
        <p className="cart-item-name">{name}</p>
        <p className="cart-item-unit">LKR {price.toLocaleString()} / unit</p>
      </div>

      <div className="cart-item-qty">
        <button
          className="qty-btn"
          onClick={() => updateQuantity(productId, quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value">{quantity}</span>
        <button
          className="qty-btn"
          onClick={() => updateQuantity(productId, quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <p className="cart-item-total">LKR {lineTotal.toLocaleString()}</p>

      <button
        className="cart-item-remove"
        onClick={() => removeFromCart(productId)}
        aria-label={`Remove ${name} from cart`}
      >
        Remove
      </button>
    </div>
  );
}
