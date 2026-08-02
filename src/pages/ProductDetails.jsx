import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Star, ArrowLeft, Loader } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const { data: productData } = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(productData);

        const { data: categoryData } = await axios.get(`https://dummyjson.com/products/category/${productData.category}?limit=4`);

        const filteredRelated = categoryData.products.filter(p => p.id !== productData.id).slice(0, 4);
        setRelatedProducts(filteredRelated);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Loader className="text-primary-blue" size={48} style={{ animation: 'spin 2s linear infinite' }} />
      </div>
    );
  }

  if (!product) {
    return <div className="container py-5 text-center">Product not found</div>;
  }

  return (
    <div className="container py-5">

      <Link to="/" className="btn btn-link text-decoration-none text-dark d-inline-flex align-items-center gap-2 mb-4">
        <ArrowLeft size={20} />
        All Products
      </Link>

      <div className="row mb-5 bg-white p-4 rounded-4 shadow-sm">

        <div className="col-md-6 mb-4 mb-md-0">
          <div className="bg-light rounded-4 mb-3 d-flex align-items-center justify-content-center p-4" style={{ height: '400px' }}>
            <img 
              src={product.images[activeImage]} 
              alt={product.title} 
              className="img-fluid" 
              style={{ maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="d-flex gap-2 overflow-auto pb-2">
            {product.images.map((img, index) => (
              <div 
                key={index}
                className={`rounded border p-2 cursor-pointer ${activeImage === index ? 'border-primary' : ''}`}
                style={{ width: '80px', height: '80px', cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`Thumbnail ${index}`} className="img-fluid h-100 w-100" style={{objectFit: 'contain'}} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-light-blue text-primary-blue">{product.category}</span>
            {product.discountPercentage > 0 && (
              <span className="badge bg-danger">-{Math.round(product.discountPercentage)}%</span>
            )}
          </div>
          
          <h2 className="fw-bold mb-3">{product.title}</h2>
          
          <div className="d-flex align-items-center gap-2 mb-4 text-warning">
            <Star size={20} fill="currentColor" />
            <span className="text-dark fw-bold">{product.rating}</span>
            <span className="text-muted small">({product.reviews?.length || 0} Reviews)</span>
          </div>
          
          <h3 className="text-primary-blue fw-bold mb-4">{product.price} $</h3>
          
          <p className="text-muted mb-4 lh-lg">
            {product.description}
          </p>

          <hr className="my-4" />

          <button 
            className="btn btn-primary-custom btn-lg w-100 d-flex justify-content-center align-items-center gap-2 py-3 rounded-pill shadow-sm"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={22} />
            Add to Cart
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-5 pt-4 border-top">
          <h3 className="fw-bold mb-4">Related Products</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
            {relatedProducts.map(p => (
              <div className="col" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
