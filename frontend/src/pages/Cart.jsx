import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = 0;

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Full name is required';
    if (!form.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!form.phone.trim()) errors.phone = 'Phone number is required';
    if (!form.address.trim()) errors.address = 'Address is required';
    if (!form.city.trim()) errors.city = 'City is required';
    if (!form.postalCode.trim()) errors.postalCode = 'Postal code is required';
    return errors;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const generatedOrderId =
      'ORD-' +
      Date.now().toString(36).toUpperCase() +
      '-' +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    setOrderId(generatedOrderId);
    setShowCheckout(false);
    setShowSuccess(true);
    setIsProcessing(false);
    clearCart();
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your Shopping Cart is Empty</h2>
          <p>You haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Checkout Modal */}
      {showCheckout && (
        <div className="modal-overlay" onClick={() => setShowCheckout(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Checkout</h2>
              <button
                className="modal-close"
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handlePlaceOrder}>
                <div className="form-section">
                  <h3>Contact Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="John Doe"
                        className={formErrors.name ? 'error-input' : ''}
                      />
                      {formErrors.name && (
                        <span className="form-error">{formErrors.name}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        placeholder="john@example.com"
                        className={formErrors.email ? 'error-input' : ''}
                      />
                      {formErrors.email && (
                        <span className="form-error">{formErrors.email}</span>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="+62 812 3456 7890"
                        className={formErrors.phone ? 'error-input' : ''}
                      />
                      {formErrors.phone && (
                        <span className="form-error">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Shipping Address</h3>
                  <div className="form-row">
                    <div className="form-group full">
                      <label>Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
                        placeholder="123 Main Street, Apt 4B"
                        className={formErrors.address ? 'error-input' : ''}
                      />
                      {formErrors.address && (
                        <span className="form-error">{formErrors.address}</span>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleFormChange}
                        placeholder="Jakarta"
                        className={formErrors.city ? 'error-input' : ''}
                      />
                      {formErrors.city && (
                        <span className="form-error">{formErrors.city}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleFormChange}
                        placeholder="12345"
                        className={formErrors.postalCode ? 'error-input' : ''}
                      />
                      {formErrors.postalCode && (
                        <span className="form-error">{formErrors.postalCode}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section order-review">
                  <h3>Order Review</h3>
                  <div className="review-items">
                    {cart.map((item) => (
                      <div key={item._id} className="review-item">
                        <span className="review-item-name">{item.name} × {item.quantity}</span>
                        <span className="review-item-price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="review-summary">
                    <div className="review-row">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="review-row">
                      <span>Shipping</span>
                      <span className="free-shipping">FREE</span>
                    </div>
                    <div className="review-row total">
                      <span>Total</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-place-order"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="btn-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>Place Order — {formatPrice(getCartTotal())}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={handleSuccessClose}>
          <div className="modal success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">🎉</div>
            <h2>Order Placed!</h2>
            <p className="success-message">
              Thank you for your order! Your order has been received and is being processed.
            </p>
            <div className="order-id-display">
              <span className="order-id-label">Order ID</span>
              <span className="order-id-value">{orderId}</span>
            </div>
            <p className="success-detail">
              A confirmation email will be sent to <strong>{form.email}</strong>.
              Estimated delivery: <strong>3–7 business days</strong>.
            </p>
            <button className="btn btn-primary" onClick={handleSuccessClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <h1 className="section-title">Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <Link
                  to={`/products/${item._id}`}
                  className="cart-item-name"
                >
                  {item.name}
                </Link>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">{formatPrice(item.price)}</p>
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="qty-btn"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="qty-btn"
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              <div className="cart-item-subtotal">
                <p>{formatPrice(item.price * item.quantity)}</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="cart-item-remove"
                title="Remove"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <button
              className="btn btn-checkout"
              onClick={handleCheckoutClick}
            >
              Checkout Now
            </button>
            <button onClick={clearCart} className="btn btn-clear">
              Clear Cart
            </button>
            <Link to="/products" className="btn-continue">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
