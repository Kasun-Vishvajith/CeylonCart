'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    // Tiny artificial delay so it doesn't feel instant
    await new Promise((r) => setTimeout(r, 400));
    const result = login(form.email.trim(), form.password);
    setLoading(false);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="page-main">
      <div className="page-container">
        <div className="login-card">
          <div className="login-header">
            <p className="login-eyebrow">Demo Account</p>
            <h1 className="login-title">Sign in to CeylonCart</h1>
            <p className="login-hint">
              <strong>User:</strong> demo@ceyloncart.lk (demo123)<br/>
              <strong>Admin:</strong> admin@ceyloncart.lk (admin123)
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="login-email">
                Email address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                className="form-input"
                value={form.email}
                onChange={handleChange}
                placeholder="demo@ceyloncart.lk"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="form-input"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
              style={{ marginTop: '8px' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
