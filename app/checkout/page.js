'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 10000;
const SHIPPING_FEE = 450;

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal } = useCart();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const { shipping, total } = useMemo(() => {
    const shippingAmount = cartTotal >= FREE_SHIPPING_THRESHOLD || cart.length === 0
      ? 0
      : SHIPPING_FEE;
    return {
      shipping: shippingAmount,
      total: cartTotal + shippingAmount,
    };
  }, [cart, cartTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email';

    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required';
    else if (form.phone.replace(/\D/g, '').length < 9) nextErrors.phone = 'Enter a valid phone number';

    if (!form.address.trim()) nextErrors.address = 'Address is required';
    if (!form.city.trim()) nextErrors.city = 'City is required';
    return nextErrors;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      router.push('/');
      return;
    }

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    localStorage.setItem(
      'ceyloncart_checkout',
      JSON.stringify({
        ...form,
        email: form.email.trim(),
      })
    );

    router.push('/payment');
  };

  if (cart.length === 0) {
    return (
      <div className="page-main">
        <div className="page-container">
          <div className="empty-state">
            <h3>No items to checkout</h3>
            <p>Your cart is empty. Add products before checking out.</p>
            <button className="btn btn-primary" onClick={() => router.push('/')} style={{ marginTop: '20px' }}>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-main">
      <div className="page-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <section className="form-section">
            <p className="form-section-title">Delivery Details</p>

            <form onSubmit={handleContinue} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={`form-input${errors.fullName ? ' form-input--error' : ''}`}
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Kasun Vishvajith"
                  autoComplete="name"
                />
                {errors.fullName && <p className="form-error">{errors.fullName}</p>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input${errors.email ? ' form-input--error' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-input${errors.phone ? ' form-input--error' : ''}`}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="077 123 4567"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className={`form-input${errors.address ? ' form-input--error' : ''}`}
                  value={form.address}
                  onChange={handleChange}
                  placeholder="No. 10, Galle Road"
                  autoComplete="street-address"
                />
                {errors.address && <p className="form-error">{errors.address}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className={`form-input${errors.city ? ' form-input--error' : ''}`}
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Colombo"
                  autoComplete="address-level2"
                />
                {errors.city && <p className="form-error">{errors.city}</p>}
              </div>

              <button id="continue-to-payment-btn" type="submit" className="btn btn-terra btn-full">
                Continue to Payment
              </button>
            </form>
          </section>

          <aside className="order-sidebar" aria-label="Order review">
            <h2 className="order-sidebar-title">Your Order</h2>

            {cart.map((item) => (
              <div key={item.productId} className="order-sidebar-item">
                <span className="order-sidebar-item-name">
                  {item.name} x{item.quantity}
                </span>
                <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}

            <div className="order-sidebar-item" style={{ marginTop: '8px' }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `LKR ${shipping.toLocaleString()}`}</span>
            </div>

            <div className="order-sidebar-total">
              <span>Total</span>
              <span>LKR {total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}