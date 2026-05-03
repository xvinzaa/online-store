import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const location = useLocation();
  const { getCartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>🛍️</span>
          Vincent Store
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              <span className="nav-icon">🏠</span>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={location.pathname === '/products' ? 'active' : ''}
            >
              <span className="nav-icon">📦</span>
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className={location.pathname === '/cart' ? 'active cart-link' : 'cart-link'}
            >
              <span className="nav-icon">🛒</span>
              Cart
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="user-menu">
              <span className="user-name">
                <span className="nav-icon">👤</span>
                {user?.name?.split(' ')[0]}
              </span>
              <button onClick={logout} className="logout-btn" title="Sign Out">
                <span>🚪</span>
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className={location.pathname === '/login' || location.pathname === '/register' ? 'active' : ''}
              >
                <span className="nav-icon">🔐</span>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
