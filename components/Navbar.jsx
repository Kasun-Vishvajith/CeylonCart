'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const { loggedIn, email, role, logout, hydrated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          CeylonCart
        </Link>

        <nav className="navbar-links">
          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/cart" className="nav-link cart-link">
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount > 99 ? '99+' : itemCount}</span>
            )}
          </Link>

          {/* Auth — only render after hydration to avoid SSR flash */}
          {hydrated && (
            loggedIn ? (
              <div className="nav-auth-group">
                {role === 'admin' && (
                  <Link href="/admin/orders" className="nav-link">
                    Admin
                  </Link>
                )}
                <span className="nav-auth-email">{email}</span>
                <button className="nav-link nav-logout-btn" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="nav-link nav-signin-link">
                Sign In
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
