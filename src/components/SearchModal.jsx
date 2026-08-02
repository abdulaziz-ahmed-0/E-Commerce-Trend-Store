import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, X, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchModal = ({ show, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [show]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=8`);
        setResults(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleProductClick = (id) => {
    onClose();
    navigate(`/product/${id}`);
  };

  if (!show) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
        onClick={onClose}
      />

      <div
        className="position-fixed start-50 translate-middle-x bg-white rounded-4 shadow-lg p-4"
        style={{ top: 80, zIndex: 2001, width: '90%', maxWidth: 620 }}
      >
        <div className="input-group mb-3">
          <span className="input-group-text bg-light border-end-0">
            <Search size={18} className="text-muted" />
          </span>
          <input
            ref={inputRef}
            type="text"
            className="form-control border-start-0 ps-0 fs-5"
            placeholder="Search for products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="btn btn-light border" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {loading && (
          <div className="text-center py-3">
            <Loader size={28} className="text-primary-blue" style={{ animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {!loading && results.length > 0 && (
          <ul className="list-group list-group-flush">
            {results.map(product => (
              <li
                key={product.id}
                className="list-group-item list-group-item-action d-flex align-items-center gap-3 rounded-3"
                style={{ cursor: 'pointer' }}
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded-2"
                  style={{ width: 50, height: 50, objectFit: 'contain', background: '#f8f9fa' }}
                />
                <div className="flex-grow-1 overflow-hidden">
                  <p className="fw-semibold mb-0 text-truncate">{product.title}</p>
                  <small className="text-muted">{product.category}</small>
                </div>
                <span className="fw-bold text-primary-blue">${product.price}</span>
              </li>
            ))}
          </ul>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-center text-muted py-3 mb-0">No products found for "<strong>{query}</strong>"</p>
        )}

        {!query && (
          <p className="text-center text-muted small py-2 mb-0">Type at least 1 character to search</p>
        )}
      </div>
    </>
  );
};

export default SearchModal;
