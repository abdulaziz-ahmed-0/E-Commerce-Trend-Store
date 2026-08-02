import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <Heart size={24} className="text-danger" fill="currentColor" />
            My Wishlist
          </h2>
          <p className="text-muted small mb-0">{wishlist.length} saved items</p>
        </div>
        <Link to="/" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          Continue Shopping
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <Heart size={64} className="text-muted mb-3 opacity-25" />
          <h5 className="fw-bold mb-2">Your wishlist is empty</h5>
          <p className="text-muted mb-4">Browse products and click the heart icon to save your favorites.</p>
          <Link to="/" className="btn btn-primary-custom rounded-pill px-5 py-2 fw-bold">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {wishlist.map(product => (
            <div className="col" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
