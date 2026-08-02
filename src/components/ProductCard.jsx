import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="card card-custom h-100">
      <Link to={`/product/${product.id}`} className="text-decoration-none text-dark position-relative d-block">
        <img
          src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/400'}
          className="card-img-top"
          alt={product.title}
          style={{ height: '250px', objectFit: 'contain', backgroundColor: '#f8f9fa', padding: '1rem' }}
        />
        {product.discountPercentage > 0 && (
          <span className="position-absolute top-0 start-0 m-3 badge bg-danger">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        <button
          className="position-absolute top-0 end-0 m-3 btn btn-sm btn-white border-0 rounded-circle p-1 shadow-sm"
          style={{ background: 'white', lineHeight: 1 }}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          onClick={handleWishlist}
        >
          <Heart
            size={18}
            className={wishlisted ? 'text-danger' : 'text-muted'}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>
      </Link>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-1">
          <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
            <h5 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: '200px' }}>{product.title}</h5>
          </Link>
          <div className="d-flex align-items-center text-warning small">
            <Star size={14} fill="currentColor" />
            <span className="ms-1 text-dark fw-bold">{product.rating}</span>
          </div>
        </div>
        <p className="text-muted small mb-2">{product.category}</p>

        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
          <span className="fw-bold fs-5 text-primary-blue">{product.price} $</span>
          <button
            className="btn btn-primary-custom d-flex align-items-center gap-2 rounded-circle p-2"
            title="Add to Cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
