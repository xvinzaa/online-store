import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      const products = await getProducts()
      setFeaturedProducts(products.slice(0, 4))
    } catch (err) {
      setError('Failed to load products. Make sure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Our Online Store</h1>
        <p>Find quality products at the best prices</p>
        <Link to="/products" className="hero-btn">
          Browse All Products
        </Link>
      </section>

      <section>
        <h2 className="section-title">Featured Products</h2>

        {loading && <div className="loading">Loading products...</div>}

        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            {featuredProducts.length > 0 ? (
              <div className="product-grid">
                {featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No products available</h3>
                <p>Please add products via the API</p>
              </div>
            )}
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/products" className="btn btn-primary">
            View All Products →
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Shipping</h3>
          <p>Delivery across Indonesia with short lead times</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Secure Payment</h3>
          <p>Multiple safe and trusted payment methods</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⭐</div>
          <h3>Quality Products</h3>
          <p>All products pass strict quality control</p>
        </div>
      </section>
    </div>
  )
}

export default Home
