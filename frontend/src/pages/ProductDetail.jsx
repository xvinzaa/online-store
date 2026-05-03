import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError('Product not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">⭐</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }

    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);

    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/${id}` } });
      return;
    }
    const productWithQty = { ...product, quantity };
    addToCart(productWithQty);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail">
      {showToast && (
        <div className="toast">
          <span className="toast-icon">✓</span>
          <span>{toastMessage}</span>
          <button onClick={() => setShowToast(false)}>×</button>
        </div>
      )}

      <Link to="/products" className="back-link">
        ← Back to Products
      </Link>

      <div className="product-detail-container">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="stock-badge">Only {product.stock} left</div>
          )}
        </div>

        <div className="product-detail-info">
          <span className="product-category-badge">{product.category}</span>
          <h1 className="product-title">{product.name}</h1>

          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-text">{product.rating}/5</span>
            <span className="rating-count">({product.stock > 0 ? 'In Stock' : 'Out of Stock'})</span>
          </div>

          <div className="product-price-tag">
            {formatPrice(product.price)}
          </div>

          <p className="product-description">{product.description}</p>

          <div className={`product-stock ${product.stock < 5 ? 'low' : ''} ${product.stock === 0 ? 'out' : ''}`}>
            {product.stock > 0 ? (
              <>
                <span className="stock-icon">📦</span>
                <span>In Stock <strong>{product.stock} unit{product.stock !== 1 ? 's' : ''}</strong></span>
              </>
            ) : (
              <>
                <span className="stock-icon">⚠️</span>
                <span>Out of Stock</span>
              </>
            )}
          </div>

          {product.stock > 0 && (
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="qty-btn"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))
                  }
                  min="1"
                  max={product.stock}
                  className="qty-input"
                />
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <span className="max-stock">Max: {product.stock}</span>
            </div>
          )}

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="btn btn-add-cart"
            >
              <span>🛒</span> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="btn btn-buy-now"
            >
              <span>⚡</span> Buy Now
            </button>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <span>🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="feature-item">
              <span>🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="feature-item">
              <span>↩️</span>
              <span>30 Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
