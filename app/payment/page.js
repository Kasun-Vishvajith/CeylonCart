'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function formatCardNumber(val) {
  return val
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(val) {
  const digits = val.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

function formatCVV(val) {
  return val.replace(/\D/g, '').slice(0, 4);
}

export default function PaymentPage() {
  const router = useRouter();

  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'number') formatted = formatCardNumber(value);
    if (name === 'expiry') formatted = formatExpiry(value);
    if (name === 'cvv') formatted = formatCVV(value);
    setCard((prev) => ({ ...prev, [name]: formatted }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    const digits = card.number.replace(/\s/g, '');
    if (digits.length < 16) errs.number = 'Enter a valid 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) errs.expiry = 'Enter expiry as MM/YY';
    if (card.cvv.length < 3) errs.cvv = 'CVV must be 3 or 4 digits';
    return errs;
  };

  const handlePay = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');

    // Simulated 1.5s delay then 90% success / 10% failure
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const success = Math.random() < 0.9;
    if (success) {
      router.push('/confirmation');
    } else {
      setStatus('error');
    }
  };

  const cardDigits = card.number || '•••• •••• •••• ••••';
  const cardExpiry = card.expiry || 'MM/YY';

  return (
    <div className="page-main">
      <div className="page-container">
        <div className="payment-card">
          <h1 className="payment-title">Payment</h1>
          <p className="payment-subtitle">
            This is a simulated payment — no real charges will be made.
          </p>

          {/* Visual card preview */}
          <div className="card-visual">
            <div className="card-chip" />
            <div className="card-number-display">{cardDigits}</div>
            <div className="card-footer-display">
              <span>{card.expiry || 'MM/YY'}</span>
              <span>CeylonCart</span>
            </div>
          </div>

          {/* Error state */}
          {status === 'error' && (
            <div className="payment-error-box">
              <p className="payment-error-title">Payment Declined</p>
              <p className="payment-error-msg">
                Your card was declined. Please check your details and try again.
              </p>
            </div>
          )}

          <form onSubmit={handlePay} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="card-number">Card Number</label>
              <input
                id="card-number"
                name="number"
                type="text"
                inputMode="numeric"
                className={`form-input${errors.number ? ' form-input--error' : ''}`}
                value={card.number}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                autoComplete="cc-number"
              />
              {errors.number && <p className="form-error">{errors.number}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="card-expiry">Expiry</label>
                <input
                  id="card-expiry"
                  name="expiry"
                  type="text"
                  inputMode="numeric"
                  className={`form-input${errors.expiry ? ' form-input--error' : ''}`}
                  value={card.expiry}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />
                {errors.expiry && <p className="form-error">{errors.expiry}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="card-cvv">CVV</label>
                <input
                  id="card-cvv"
                  name="cvv"
                  type="text"
                  inputMode="numeric"
                  className={`form-input${errors.cvv ? ' form-input--error' : ''}`}
                  value={card.cvv}
                  onChange={handleChange}
                  placeholder="•••"
                  autoComplete="cc-csc"
                />
                {errors.cvv && <p className="form-error">{errors.cvv}</p>}
              </div>
            </div>

            <button
              id="pay-now-btn"
              type="submit"
              className="btn btn-terra btn-full"
              disabled={status === 'loading'}
              style={{ marginTop: '8px' }}
            >
              {status === 'loading' ? (
                <>
                  <span className="loading-spinner" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>

            {status === 'error' && (
              <button
                id="try-again-btn"
                type="button"
                className="btn btn-outline btn-full"
                style={{ marginTop: '10px' }}
                onClick={() => setStatus('idle')}
              >
                Try Again
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
