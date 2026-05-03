import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-card-content">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">{formatPrice(product.price)}</p>
        <p className="description">{product.description}</p>
        <p className={`stock ${product.stock < 5 ? 'low' : ''}`}>
          {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
